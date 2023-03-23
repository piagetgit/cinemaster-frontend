import { UserInfoI } from './../interface/userLoginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    basePath: string = "http://localhost:8080/api/v1/cinemaster";
    userIsLogged!: UserInfoI;
    private _currentView;

    private observers: { [evento: string]: ((e: string) => void)[] };


    constructor(private http: HttpClient) {
        this._currentView = "home";
        this.observers = {};
        this.observers["view"] = [];
        this.observers["login"] = [];
    }

    observe(evento: string, callback: (e: string) => void) {
        if (this.observers.hasOwnProperty(evento)) {
            this.observers[evento].push(callback);
        }
    }

    changeView(view: string) {

        for (let callback of this.observers["view"]) {
            callback(view);
        }
    }

    get currentView() {
        return this._currentView;
    }

    set currentView(view: string) {
        this._currentView = view;
    }

    login() {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        const body = { id: 'alice.corvetto2@cmail.it', logPassword: 'alccrvtt' };
        return this.http.post<UserInfoI | null>(this.basePath + '/user/login', JSON.stringify(body), { headers: headers });

        /*(data => {
                this.userIsLogged={
                    email:data.email,
                    cognome:data.cognome,
                    dataNascita:data.dataNascita,
                    id:data.id,
                    nome:data.nome
                };
            }
        });
        console.log("ecco1 "+ this.userIsLogged);

        if(data!==null){
            for (let callback of this.observers["login"])
                callback("userId");
            for (let callback of this.observers["view"]) {
                 callback('home');
            }
        }
        return true;*/

    }
    updateView(id:string) {
        for (let callback of this.observers["login"])
            callback(id);
        for (let callback of this.observers["view"]) {
            callback('home');
        }
    }

}
