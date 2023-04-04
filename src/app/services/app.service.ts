import { Ticket } from './../interface/ticket';
import { FilmInfoI } from '../interface/film';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    basePath: string = "http://localhost:8080/api/v1/cinemaster";
    loadedFilm! : FilmInfoI[]
    private _films: Promise<{ [id: number]: FilmInfoI }>;
    private _tickets!: Promise<Ticket[]>;

    //private tickets!: Ticket[];

    constructor(private http: HttpClient, private toast: NgToastService) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        const result = this.http.get<FilmInfoI[]>(this.basePath + '/films', { headers: headers });
        const resultAsPromise = lastValueFrom<FilmInfoI[]>(result);


        this._films = resultAsPromise.then((dati: FilmInfoI[]) => {
            const result: { [id: number]: FilmInfoI } = {};
            for (let film of dati) {
                result[film.id] = film;
            }
            //console.log(result);
            return result;
        })
    }

    loadFilm() {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        return this.http.get<FilmInfoI[] | null >(this.basePath + '/films', { headers: headers });
    }
    loadTicketByUserId(userId: number) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        console.log("url: " + this.basePath + '/payment/tickets/' + userId);

        return this.http.get<Ticket[] | null >(this.basePath + '/payment/tickets/' + userId, { headers: headers });

       /* const resultAsPromise = lastValueFrom<Ticket[]>(result);


        this._tickets = resultAsPromise.then((dati: Ticket[]) => {
            const result: Ticket[] = [];
            for (let ticket of dati) {
                result.push(ticket);
            }
            //console.log(result);
            return result;
        })

        return this._tickets;*/
    }

    buyTicket(userId: number, filmId: number, numeroPersone: number,prezzo:number, dataOra: string, pagato: boolean, posti: string) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        let posto = Number(Math.random().toString().substring(3,4));
        let generatePosti=posto.toString();

        for(let i=1;i<numeroPersone;i++){
           posto=posto+1;
           generatePosti+=","+posto;
        }
        
        const body = { prezzoTotale:prezzo*numeroPersone,userId: userId, filmId: filmId, numeroPersone: numeroPersone, dataOra: Date.parse(dataOra), pagato: pagato, posti: generatePosti };

        console.log("url: " + this.basePath + '/payment/ticket/buy' + "\n" + "body: " + JSON.stringify(body));

        return this.http.post<Ticket>(this.basePath + '/payment/ticket/buy', JSON.stringify(body), { headers: headers });

    }

    openOnSuccessLogin(message: string) {
        this.toast.success({ detail: 'success', summary: message, position: 'tr', duration: 1000 });
    }
    openOnFailLogin(message: string) {
        this.toast.error({ detail: 'Error', summary: message, position: 'tr', duration: 1000 });
    }
    openOnInfo(message:string,duration:number){
        this.toast.info({ detail: 'Info', summary: message, position: 'tr', duration: duration });
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
