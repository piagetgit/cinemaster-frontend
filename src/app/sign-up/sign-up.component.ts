import {Component, ViewEncapsulation} from '@angular/core';
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { AppStateService } from "../services/app-state.service";
import { NgToastService } from 'ng-angular-popup';
import { UserSignUpResponse } from '../interface/userSignupResponse';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  //encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  birthdate: string = '';
  /*dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };*/
  useregistred!: UserSignUpResponse;

  constructor(private appStateService:AppStateService,private appService: AppService) {
  }

  signup(event: MouseEvent) {
    event.preventDefault();
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
