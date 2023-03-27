import { Component, OnInit } from '@angular/core';
import { AppStateService } from "../services/app-state.service";
import {FilmInfoI} from "../interface/film";
import {UserInfoI} from "../interface/userLoginResponse";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  films!:FilmInfoI[];
  user!:UserInfoI;

  constructor(private appStateService:AppStateService) {
  }

  ngOnInit() {
  }
}
