import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav﻿/main-nav﻿.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DialogComponent } from './dialog/dialog.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { HeroGalleryComponent } from './hero-gallery/hero-gallery.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthGuard } from './auth.guard';
import { HeroGuard } from './hero.guard';

import {SlideshowModule} from 'ng-simple-slideshow';

library.add(faTwitter, faGithub, faLinkedin);

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HeroDetailsComponent,
    HeroCreateComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    FooterComponent,
    PageNotFoundComponent,
    DialogComponent,
    HeroCardComponent,
    HeroGalleryComponent,
    SpinnerComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    LayoutModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonToggleModule,
    SlideshowModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  entryComponents: [DialogComponent],
  providers: [AngularFireDatabase, AuthGuard, HeroGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
