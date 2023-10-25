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
  showDate!: string;

  constructor(private appService: AppService, private appStateService: AppStateService) {

  }

  ngOnInit() {
    console.log("init ticket component")
    this.appService.loadFilm().subscribe((films) => {
      if (films != null)
        this.films = films;
    });

    this.titolo = this.appStateService.filmToPay.title;
    this.film = this.appStateService.filmToPay;

  }

  addSeats(event: Event) {
    this.nSeats = (event.target as HTMLInputElement).value;
  }

  buy(event: MouseEvent) {
    event.preventDefault();
    let id = this.films?.filter(f=>f.title === this.titolo)[0].id;
    this.appService.buyTicket(this.appStateService.userLogged.id,id!, Number(this.nSeats),this.film.price, this.showDate, true, "R8").subscribe((data) => {
      console.log(data);
      if (data !== null){
        this.appStateService.changeView('movies');
        this.appService.openOnSuccessLogin('Success');
      }
    })
  }

  updateShowdate(event: Event) {
    this.showDate = (event.target as HTMLInputElement).value;
  }
}
