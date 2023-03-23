import {Component, OnInit} from '@angular/core';
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

  ngOnInit(): void {
    this.appStateService.observe("view", (view: string) => {
      this.view = view;
    });
    this.appStateService.observe("login", (userId: string) => {
      this.userLogged = userId;
    });
    this.userLogged = "";
  }

  goTo(where: "home" | "user" | "film" | "tickets" | "aboutus") {
    this.appStateService.currentView = where;
  }
}
