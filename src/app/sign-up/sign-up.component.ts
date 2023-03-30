import {Component, ViewEncapsulation} from '@angular/core';
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { AppStateService } from "../services/app-state.service";
import {UserRegistred} from "../interface/userSignupResponse";
import { NgToastService } from 'ng-angular-popup';

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
  useregistred!: UserRegistred;

  constructor(private appStateService:AppStateService) {
  }

  signup(event: MouseEvent) {
    event.preventDefault();
    this.appStateService.register().subscribe((data: UserRegistred | null) => {
      if (data !== null) {
        this.useregistred = {
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          password: data.password,
          dataNascita: data.dataNascita,
          ruolo: "user"
        }
        this.appStateService.changeView('home');

        //this.openOnSuccessLogin();
      }
      else {
        //this.openOnFailLogin();
      }
    })
  }

  /*openOnSuccessLogin() {
    this.toast.success({ detail: 'success', summary: 'Login Success', position: 'tr', duration: 2000 });
  }
  openOnFailLogin() {
    this.toast.error({detail: 'Error', summary: 'Check your email and Password', position: 'tr', duration: 2000});
  }*/

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
