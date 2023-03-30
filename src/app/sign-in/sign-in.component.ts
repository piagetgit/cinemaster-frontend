import { AppStateService } from '../services/app-state.service';
import { AppService } from '../services/app.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(private appLoginService: AppService, private appStateService: AppStateService, private toast: NgToastService) {

  }

  signin(event: Event) {
    event.preventDefault();
    //console.log(this.email + " " + this.password)
    this.appStateService.login(this.email,this.password).subscribe((data: UserInfoI | null) => {
      if (data !== null) {
        this.userlogged = {
          email: data.email,
          cognome: data.cognome,
          dataNascita: data.dataNascita,
          id: data.id,
          nome: data.nome
        }
        
        this.appStateService.userLogged=this.userlogged;
        this.appStateService.updateView(this.userlogged.nome);
        //console.log("ecco"+this.appStateService.userLogged.nome)

        this.openOnSuccessLogin();
      }
      else {
        this.openOnFailLogin();
      }


    })
  }

  openOnSuccessLogin() {
    this.toast.success({ detail: 'success', summary: 'Login Success', position: 'tr', duration: 2000 });
  }
  openOnFailLogin() {
    this.toast.error({ detail: 'Error', summary: 'Check your email and Password', position: 'tr', duration: 2000 });
  }

  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }
  updatePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }




}
