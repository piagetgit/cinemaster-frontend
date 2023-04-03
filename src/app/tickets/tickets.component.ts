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
  tickets!: Ticket[];

  displayedColumns: string[] = ['id', 'dataOra', 'numeroPersone', 'prezzoTotale', 'posti', 'pagato'];

  constructor(private appService: AppService, private appStateService: AppStateService) {

  }

  ngOnInit() {
    console.log("init ticket component")
    this.appService.films.then((films) => {
      this.films = films;
    });

    this.appService.loadTicketByUserId(this.appStateService.userLogged.id).then((tickets) => {
      this.tickets = tickets.sort((t1, t2) => {
        if (t1.dataOra < t2.dataOra)
          return -1
        else
          return 1
      })
    });
    if (this.appStateService.filmToPay !== undefined) {
      this.titolo = this.appStateService.filmToPay.titolo;
      this.film = this.appStateService.filmToPay;
    }
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
   /*console.log(this.appStateService.userLogged);
    console.log(this.film);*/
    this.appService.buyTicket(this.appStateService.userLogged.id,this.film.id,Number(this.nSeats),'2023-04-04T20:00:00',true,"R8").subscribe((data)=>{
        console.log(data);
    })
  }
}
