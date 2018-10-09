import { Injectable, OnInit, OnDestroy } from '@angular/core';
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

  user$: Observable<firebase.User>;
  hero$;
  // heroList$: AngularFireList<any[]>;
  heroName = 'genji';
  tempHero;
  currentHero: Hero;
  // user.uid => hold unique id
  constructor(private breakpointObserver: BreakpointObserver,
              private http: HttpClient,
              private db: AngularFireDatabase,
              private router: Router,
              public firebaseAuth: AngularFireAuth) {
                this.user$ = firebaseAuth.user;
                firebaseAuth.authState.subscribe(data => {
                  this.userId = data.uid;
                });
              }

  ngOnInit() {
    this.hero$ = this.http.get('../assets/data/tracer.json')
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
    // this.hero$ = this.db.object<Hero>(`/heroes/${this.heroName}`).valueChanges();
    this.tempHero = this.http.get('../assets/data/genji.json');
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
        this.userId = this.firebaseAuth.auth['O'];
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

  addHero(): void {
    if (!this.currentHero) {
      this.http.get<Hero>('../assets/data/genji.json')
      .subscribe(res => {
        const heroName = res.heroName.toLocaleLowerCase();
        this.db.object(`/${this.userId}/${heroName}`).set(res);
        this.currentHero = res;
      } );

    }
  }

  getHero(url: string, heroName: string) {
    heroName = heroName.toLocaleLowerCase();
    url = `${this.userId}/${heroName}`;
    this.hero$ = this.db.object(url).valueChanges();
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
