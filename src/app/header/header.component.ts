import { AppStateService } from '../services/app-state.service';
import { MatButtonModule } from '@angular/material/button';
import { Component, NgModule, OnInit } from '@angular/core';


const MaterialComponents = [MatButtonModule];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLogged!: string

  constructor(private appStateService: AppStateService) {


  }

  changeView(event: Event, view: string) {
    if (view.length > 0) {
      this.appStateService.changeView(view);
    }
    else {
      this.appStateService.logout()
    }

  }

  ngOnInit() {
    this.appStateService.observe("view", (view: string) => {
      this.appStateService.currentView = view;
      console.log("header" + this.appStateService.currentView);
    });
    this.appStateService.observe("login", (userId: string) => {
      this.userLogged = userId;
    });

    this.userLogged = "";
  }
}
