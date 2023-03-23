import {Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {AppStateService} from "../app-state.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  view!: string;

  constructor(private appServ: AppStateService) {
    this.view = this.appServ.currentView;
  }

  ngOnInit(): void {
    this.appServ.observe("view", (view: string) => {
      this.view = view;
    });
  }

  goTo(where: "home" | "user" | "film" | "tickets") {
    this.appServ.currentView = where;
  }
}
