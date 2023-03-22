import { AppService } from './../app.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  password: string = '';

  constructor(private appLoginService: AppService) {

  }

  signin(event:Event) {
    event.preventDefault();
    console.log(this.email + " " + this.password)
    this.appLoginService.login();
    
  }


  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }
  updatePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }




}
