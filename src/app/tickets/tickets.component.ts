import { Component, OnInit } from '@angular/core';
import { AppStateService } from "../services/app-state.service";
import {AppService} from "../services/app.service";
import {FilmInfoI} from "../interface/film";
import {UserInfoI} from "../interface/userLoginResponse";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  films!:FilmInfoI[] | null;
  film!:FilmInfoI;
  titolo!: string;
  nSeats!: string;
  tickets!: {nome: string, seats: number, price: number}[];

  constructor(private appService:AppService){

  }

  ngOnInit() {
    this.appService.films.then((films)=>{
      this.films=films;
    });
  }

  verifyFilm(event: Event) {
    this.titolo = (event.target as HTMLInputElement).value;
    if (this.films !== null) {
      for (let film of this.films) {
        if (film.titolo === this.titolo)
          this.film = film;
      }
    }
  }

  addSeats(event: Event) {
    this.nSeats = (event.target as HTMLInputElement).value;
    const posti = parseInt(this.nSeats, 10);
  }

  buy(event: MouseEvent) {
    event.preventDefault();

  }
}
