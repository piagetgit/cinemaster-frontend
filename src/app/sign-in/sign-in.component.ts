import { AppStateService } from '../services/app-state.service';
import { AppService } from '../services/app.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  password: string = '';

  constructor(private appLoginService: AppService,private appStateService:AppStateService,private toast:NgToastService) {

  }

  signin(event:Event) {
    event.preventDefault();
    console.log(this.email + " " + this.password)
    if(this.appStateService.login()){
      this.openOnSuccessLogin();
    }
    
  }

  openOnSuccessLogin(){
    this.toast.success({detail:'success',summary:'Login Success',position:'tr', duration:5000});
  }

  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }
  updatePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }




}
