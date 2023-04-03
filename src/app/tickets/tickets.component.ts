import { AppStateService } from './../services/app-state.service';
import { Ticket } from './../interface/ticket';
import { Component, OnInit } from '@angular/core';
import { AppService } from "../services/app.service";
import { FilmInfoI } from "../interface/film";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  films!: FilmInfoI[] | null;
  film!: FilmInfoI;
  titolo!: string;
  nSeats!: string;

  constructor(private appService: AppService, private appStateService: AppStateService) {

  }

  ngOnInit() {
    console.log("init ticket component")
    this.appService.films.then((films) => {
      this.films = films;
    });

    this.titolo = this.appStateService.filmToPay.titolo;
    this.film = this.appStateService.filmToPay;

  }

  addSeats(event: Event) {
    this.nSeats = (event.target as HTMLInputElement).value;
    const posti = parseInt(this.nSeats, 10);
  }

  buy(event: MouseEvent) {
    event.preventDefault();
    this.appService.buyTicket(this.appStateService.userLogged.id, this.film.id, Number(this.nSeats), '2023-04-04T20:00:00', true, "R8").subscribe((data) => {
      console.log(data);
      if (data !== null){
        this.appStateService.changeView('movies');
        this.appService.openOnSuccessLogin('Success');
      }
    })
  }
}
