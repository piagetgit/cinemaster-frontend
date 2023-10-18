import { AppStateService } from '../services/app-state.service';
import { AppService } from '../services/app.service';
import { Component } from '@angular/core';
import { HttpResponse,HttpErrorResponse,HttpHeaderResponse } from '@angular/common/http';
import { UserInfoI } from '../interface/userLoginResponse';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  password: string = '';
  userlogged!: UserInfoI;

  constructor(private appService: AppService, private appStateService: AppStateService) { }

  /*signin(event: Event) {
    event.preventDefault();
    this.appStateService.login(this.email, this.password).subscribe((data: HttpHeaderResponse) => {
      console.log("ecco "+ JSON.stringify(data));
      /*if (data !== null && data !== undefined)  {
        this.userlogged = {
          email: data.email,
          cognome: data.cognome,
          dataNascita: data.dataNascita,
          id: data.id,
          nome: data.nome
        }

        this.appStateService.userLogged = this.userlogged;
        this.appStateService.updateView(this.userlogged.nome);

        this.appService.openOnSuccessLogin("Login Success");
      }
      else {
        this.appService.openOnFailLogin("Check your email and Password");
      }
    })
  }*/

  signin(event: Event) {
    event.preventDefault();
    this.appStateService.login(this.email, this.password).subscribe(response => {
      console.log('Response:', response.body);
      let data = JSON.parse(JSON.stringify(response.body));
      //console.log("ecco "+ JSON.stringify(data));
      if (data !== null && data !== undefined)  {
        this.userlogged = {
          email: data.email,
          cognome: data.cognome,
          dataNascita: data.dataNascita,
          id: data.id,
          nome: data.nome
        }

        this.appStateService.userLogged = this.userlogged;
        this.appStateService.updateView(this.userlogged.nome);

        this.appService.openOnSuccessLogin("Login Success");
      }
      else {
        this.appService.openOnFailLogin("Check your email and Password");
      }
    },
    error =>{
      console.error('Error:', error);
      //this.errorMessage = error.error;
      this.appService.openOnFailLogin("Check your email and Password");
    })
  }

  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }
  updatePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }




}
