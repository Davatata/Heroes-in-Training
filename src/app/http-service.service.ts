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
                  )
                );

                this.heroesObservable.subscribe(next => {
                  localStorage[CACHE_KEY] = JSON.stringify(next);
                });

                this.heroesObservable = this.heroesObservable.pipe(
                  startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
                );

                this.user$.subscribe(res => {
                  this.yourHeroes$ = db.list(`${firebaseAuth.auth.currentUser.uid}`);
                });
              }

  ngOnInit() {
    // console.log('current hero: ', this.hero$);
    // console.log('current tempHero: ', this.tempHero);
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
          this.userId = data.uid;
          this.yourHeroes$ = this.db.list(`${data.uid}`);
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
          this.userId = data.uid;
          this.yourHeroes$ = this.db.list(`${data.uid}`);
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
    // if (!this.yourHeroes$) {
    //   this.yourHeroes$ = this.db.list(`${this.firebaseAuth.auth.currentUser.uid}`);
    // }
    this.yourHeroes$.push(hero).then(res => {
      // console.log(res);
      const userId = res.path.pieces_[0];
      const heroId = res.path.pieces_[1];
      this.heroList$.set(heroId, {
        'heroId': heroId,
        'heroName': hero.heroName,
        'userId': userId,
        // 'link': `${userId}/${heroId}`,
        'design': hero.design,
        'heroDetailDescription': hero.heroDetailDescription
      });
      this.getHero(userId, heroId);
    });
  }

  getHero(userId: string, heroId: string) {
    const heroUrl = userId + '/' + heroId;
    const params = {
      'h': heroId,
      'u': userId
    };
    localStorage['hit-h'] = heroId;
    localStorage['hit-u'] = userId;
    this.hero$ = this.http.get(`${this.url}/${heroUrl}.json`);
    // console.log('getting hero');
    this.router.navigate(['/hero-details', params]);
    window.scrollTo(0, 0);
  }

  updateHero(newValues: Object) {
    this.db.object(`/heroes/genji`).update(newValues)
      .then(res => {
        console.log('Update success.');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
