import {Component} from '@angular/core';
import { AppStateService } from "../services/app-state.service";
import { UserSignUpResponse } from '../interface/userSignupResponse';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  birthdate: string = '';
  useregistred!: UserSignUpResponse;

  constructor(private appStateService:AppStateService,private appService: AppService) {
  }

  /*signup(event: MouseEvent) {
    event.preventDefault();
    if(this.email.length===0 ||this.name.length===0 || this.password.length===0 || this.surname.length===0 || this.birthdate.length===0){
      this.appService.openOnFailLogin("Empty fields are not allowed");
      this.appStateService.changeView('signup');
    }else{
      this.appStateService.registration(this.email,this.password,this.name,this.surname,this.birthdate).subscribe((data: UserSignUpResponse | null) => {
      if (data !== null) {
          if (data.code === "2002"){
            this.appService.openOnSuccessLogin("SignUp Success");
          }
          else if (data.code === "4004"){
            this.appService.openOnFailLogin(data.message);
          }
        }
        this.appStateService.changeView('home');

    })
    }

  }*/

  signup(event: MouseEvent) {
    event.preventDefault();
    if(this.email.length===0 ||this.name.length===0 || this.password.length===0 || this.surname.length===0 || this.birthdate.length===0){
      this.appService.openOnFailLogin("Empty fields are not allowed");
      this.appStateService.changeView('signup');
    }else{
      this.appStateService.registration(this.email,this.password,this.name,this.surname,this.birthdate).subscribe(response => {
        console.log('Response:', response.body);
        let data = JSON.parse(JSON.stringify(response.body));
        //console.log("ecco "+ JSON.stringify(data));
        if (data !== null && data !== undefined)  {
          this.useregistred = {
            message: data.message,
            code: data.code
          }
          if (this.useregistred.code === "2002"){
            this.appStateService.changeView('home');
            this.appService.openOnSuccessLogin("SignUp Success");
          }
          else if (this.useregistred.code === "4004"){
            this.appService.openOnFailLogin(data.message);
          }
        }
        else {
          this.appService.openOnFailLogin("Check your email and Password");
        }
      },
      error =>{
        console.error('Error:', error);
        //this.errorMessage = error.error;
        this.appService.openOnFailLogin(error.error.message);
      })

     }
  }

  updateName(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  updateSurname(event: Event) {
    this.surname = (event.target as HTMLInputElement).value;
  }

  updateEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  updatePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  updateBirthdate(event: Event) {
    this.birthdate = (event.target as HTMLInputElement).value;
  }
}
