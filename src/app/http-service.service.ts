import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, startWith } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Hero } from './models/hero.model';

const CACHE_KEY = 'httpRepoCache';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  userId = '';
  url = 'https://heroes-in-training.firebaseio.com';
  tracer;
  user$: Observable<firebase.User>;
  hero$: Observable<any>;
  heroList$: AngularFireList<any>;
  yourHeroes$: AngularFireList<any>;
  heroesObservable: Observable<any>;
  params = {};
  editMode = false;

  heroName = 'genji';
  tempHero;
  currentHero: Hero;
  unsavedHero: Hero;
  // user.uid => hold unique id
  constructor(private breakpointObserver: BreakpointObserver,
              private http: HttpClient,
              private db: AngularFireDatabase,
              private router: Router,
              public firebaseAuth: AngularFireAuth) {
                this.user$ = firebaseAuth.user;
                this.heroList$ = db.list('heroes');

                this.heroesObservable = this.heroList$.snapshotChanges().pipe(
                  map(changes =>
                    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
                  ),
                  map(arr => arr.reverse())
                );

                this.heroesObservable.subscribe(next => {
                  localStorage[CACHE_KEY] = JSON.stringify(next);
                });

                this.heroesObservable = this.heroesObservable.pipe(
                  startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
                );

                this.user$.subscribe(res => {
                  if (firebaseAuth.auth.currentUser) {
                    this.yourHeroes$ = db.list(`${firebaseAuth.auth.currentUser.uid}`);
                  }
                });
              }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.logout();
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!');
        this.router.navigate(['/home']);
        // this.userId = this.firebaseAuth.auth['O'];
        this.firebaseAuth.authState.subscribe(data => {
          if (data && data.uid) {
            this.userId = data.uid;
            this.yourHeroes$ = this.db.list(`${data.uid}`);
          }
        });
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, logged in!');
        this.router.navigate(['/home']);
        this.firebaseAuth.authState.subscribe(data => {
          if (data && data.uid) {
            this.userId = data.uid;
            this.yourHeroes$ = this.db.list(`${data.uid}`);
          }
        });
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
      this.router.navigate(['/login']);
  }

  addHero(hero: Hero) {
    this.yourHeroes$.push(hero).then(res => {
      const userId = res.path.pieces_[0];
      const heroId = res.path.pieces_[1];
      this.heroList$.set(heroId, {
        'heroId': heroId,
        'heroName': hero.heroName,
        'userId': userId,
        'design': hero.design,
        'heroDetailDescription': hero.heroDetailDescription
      });
      this.editMode = false;
      this.getHero(userId, heroId);
    });
  }

  getHero(userId: string, heroId: string) {
    this.editMode = false;
    const heroUrl = userId + '/' + heroId;
    this.params = {
      'h': heroId,
      'u': userId
    };
    localStorage['hit-h'] = heroId;
    localStorage['hit-u'] = userId;
    this.hero$ = this.http.get(`${this.url}/${heroUrl}.json`);
    // console.log('getting hero');
    this.router.navigate(['/hero-details'], { queryParams: this.params });
    window.scrollTo(0, 0);
  }

  editHero() {
    this.editMode = true;
    this.router.navigate(['/hero-create']);
  }

  isCreator() {
    return this.firebaseAuth.auth.currentUser.uid === this.params['u'];
  }

  updateHero(hero: Hero) {
    const heroId = this.params['h'];
    const userId = this.params['u'];
    this.yourHeroes$.update(heroId, hero);
    this.heroList$.update(heroId, {
      'heroId': heroId,
      'heroName': hero.heroName,
      'userId': userId,
      'design': hero.design,
      'heroDetailDescription': hero.heroDetailDescription
    });
    this.editMode = false;
    this.router.navigate(['/hero-details']);
  }
}
