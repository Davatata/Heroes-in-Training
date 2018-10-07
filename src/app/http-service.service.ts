import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Hero } from './models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit {
  userId = '1';
  url = '../assets/data/genji.json';

  user$: Observable<firebase.User>;
  hero$;
  // heroList$: AngularFireList<any[]>;
  heroName = 'genji';
  tempHero;
  // user.uid => hold unique id
  constructor(private http: HttpClient,
              private db: AngularFireDatabase,
              private router: Router,
              public firebaseAuth: AngularFireAuth) {
                this.user$ = firebaseAuth.user;
              }

  ngOnInit() {
    // this.hero$ = this.db.object<Hero>(`/heroes/${this.heroName}`).valueChanges();
    this.tempHero = this.http.get('../assets/data/genji.json');
    // this.heroList$ = this.db.list('/heroes');
    // console.log(this.heroList$[0]);

    console.log('current hero: ', this.hero$);
    console.log('current tempHero: ', this.tempHero);
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!');
        this.router.navigate(['/home']);
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
    // this.hero$.set(this.tempHero).then(res => console.log('hero updated', res));
    // this.hero$.update(hero).then(_ => console.log('hero set.'));
  }

  getHero(heroName: string) {
    this.hero$ = this.db.object(`/heroes/${heroName}`).valueChanges();
    // console.log(this.hero$);
  }

  updateHero(newValue) {
    this.db.object('/heroes/' + this.hero$.$key)
      .update(newValue);
  }
}
