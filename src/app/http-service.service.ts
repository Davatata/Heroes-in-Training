import { Injectable, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Hero } from './models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  userId = '';
  url = 'https://heroes-in-training.firebaseio.com/';
  tracer;
  user$: Observable<firebase.User>;
  hero$;
  heroList$: AngularFireList<any>;
  yourHeroes$: AngularFireList<any>;

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
                // if (firebaseAuth.auth.currentUser) {
                //   this.yourHeroes$ = db.list(firebaseAuth.auth.currentUser.uid);
                // }
                // const listObservable = this.heroList$.snapshotChanges();
                // listObservable.subscribe();
              }

  ngOnInit() {
    // this.hero$ = this.http.get('../assets/data/tracer.json')
    //   .subscribe(res => {
    //     this.tracer = res;
    //     console.log(res);
    //   }, err => {
    //     console.log(err);
    //   });
    // this.hero$ = this.db.object<Hero>(`/heroes/${this.heroName}`).valueChanges();
    // this.tempHero = this.http.get('../assets/data/genji.json');
    // this.heroList$ = this.db.list('/heroes');
    // console.log(this.heroList$[0]);

    console.log('current hero: ', this.hero$);
    console.log('current tempHero: ', this.tempHero);
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
    // if (!this.currentHero) {
    //   this.http.get<Hero>('../assets/data/genji.json')
    //   .subscribe(res => {
    //     const heroName = res.heroName.toLocaleLowerCase();
    //     // this.db.object(`${this.userId}/${heroName}`).set(res);
    //     this.http.post(`${this.url}/${this.userId}/${heroName}`, res);
    //     this.currentHero = res;
    //   } );
    // } else {
    // this.http.post(`${this.url}/${this.firebaseAuth.auth.currentUser.uid}/${hero.heroName}.json`, hero);
    // const heroRef = {
    //   heroName: hero.heroName,
    //   link: `${this.url}/${this.userId}/${}`
    // };
    // this.heroList$.push({: );
    this.yourHeroes$.push(hero).then(res => {
      console.log(res);
      const userId = res.path.pieces[0];
      const heroId = res.path.pieces[1];
      this.heroList$.set(heroId, {
        'heroId': heroId,
        'heroName': hero.heroName,
        'link': `${userId}/${heroId}`,
        'design': hero.design
      });
    });
    // }
  }

  getHero(url: string) {
    this.hero$ = this.http.get(`${url}.json`);
    // return;
    // heroName = heroName.toLocaleLowerCase();
    // url = `${this.userId}/${heroName}`;
    // if (isDevMode()) {
    //   this.hero$ = this.http.get(`../assets/data/${heroName}.json`);
    // } else {
    //   this.hero$ = this.db.object(url).valueChanges();
    // }
    // this.hero$ = this.db.object(`/123/321`).valueChanges();
    // console.log(this.hero$);
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
