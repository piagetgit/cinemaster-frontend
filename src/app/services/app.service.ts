import { Ticket } from './../interface/ticket';
import { FilmInfoI } from '../interface/film';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    basePath: string = "http://localhost:8080/api/v1/cinemaster";
    //basePath: string = "http://localhost:8080/api/customer";
    private _films: Promise<{[id: number]: FilmInfoI}>;
    private _tickets!: Promise<Ticket[]>;

    //private tickets!: Ticket[];

    constructor(private http: HttpClient) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        const result = this.http.get<FilmInfoI[]>(this.basePath + '/films', { headers: headers });
        const resultAsPromise = lastValueFrom<FilmInfoI[]>(result);


        this._films = resultAsPromise.then((dati: FilmInfoI[]) => {
           const result: {[id: number]: FilmInfoI}= {};
            for (let film of dati) {
              result[film.id] = film;
            }
            //console.log(result);
            return result;
          })
    }

    /*loadFilm(): FilmInfoI[] {
        let film: any[] = [];
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        this.http.get<FilmInfoI[]>(this.basePath + '/films', { headers: headers }).subscribe(data => {
            //console.log(data);
            film = data;
        });

        return film;
    }*/
    loadTicketByUserId(userId:number){
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        console.log("url: "+this.basePath + '/payment/tickets/'+userId);

        const result=this.http.get<Ticket[]>(this.basePath + '/payment/tickets/'+userId, { headers: headers });

        const resultAsPromise = lastValueFrom<Ticket[]>(result);


        this._tickets = resultAsPromise.then((dati: Ticket[]) => {
           const result : Ticket[]= [];
            for (let ticket of dati) {
              result.push(ticket);
            }
            //console.log(result);
            return result;
          })

          return this._tickets;
    }

    get films(): Promise<FilmInfoI[]> {
        return this._films.then((dati) => {
            return Object.values(dati);
          });

    }

    get tickets(): Promise<Ticket[]> {
        return this._tickets.then((dati) => {
            return Object.values(dati);
          });

    }
}
