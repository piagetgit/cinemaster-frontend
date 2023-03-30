import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FilmCollectionComponent } from './film-collection/film-collection.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { SignInComponent } from './sign-in/sign-in.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {NgToastModule} from "ng-angular-popup";
import { PresentationComponent } from './presentation/presentation.component';
import { TicketsComponent } from './tickets/tickets.component';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MatTableModule} from '@angular/material/table';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from '@coreui/angular';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    FilmCollectionComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    PresentationComponent,
    TicketsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    NgToastModule,
    MatTableModule,
    CarouselModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
