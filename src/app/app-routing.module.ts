import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeroGalleryComponent } from './hero-gallery/hero-gallery.component';
import { AuthGuard } from './auth.guard';
import { HeroGuard } from './hero.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent},
  { path: 'hero-details', component: HeroDetailsComponent, canActivate: [HeroGuard]},
  { path: 'hero-create', component: HeroCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'gallery', component: HeroGalleryComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
