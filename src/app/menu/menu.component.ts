import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  view!: string;
  userLogged!: string;

  constructor(private appStateService: AppStateService) {
    this.view = this.appStateService.currentView;
  }

  ngOnInit() {
    console.log("Menu init");
    this.appStateService.observe("view", (view: string) => {
      this.view = view;
    });
    this.appStateService.observe("login", (userId: string) => {
      this.userLogged = userId;
      console.log("header: " + this.userLogged);
    });
    
    if (this.appStateService.userLogged != null) {
      this.userLogged = this.appStateService.userLogged.nome;
    } else {
      this.userLogged = "";
    }

  }

  goTo(where: "home" | "user" | "film" | "tickets" | "presentation") {
    this.appStateService.changeView(where);
  }
}
