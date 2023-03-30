import { UserInfoI } from './../interface/userLoginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';
import {UserRegistred} from "../interface/userSignupResponse";

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    basePath: string = "http://localhost:8080/api/v1/cinemaster";
    _userLogged!: UserInfoI | null;
    private _currentView;

    private observers: { [evento: string]: ((e: string) => void)[] };
    //private _users: Promise<{[id: number]: UserInfoI}>;


    constructor(private http: HttpClient) {
        this._currentView = "home";
        this.observers = {};
        this.observers["view"] = [];
        this.observers["login"] = [];

      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json'
      });

      /*const result = this.http.get<UserInfoI[]>(this.basePath + '/users', { headers: headers });
      const resultAsPromise = lastValueFrom<UserInfoI[]>(result);


      this._users = resultAsPromise.then((dati: UserInfoI[]) => {
        const result: {[id: number]: UserInfoI}= {};
        for (let user of dati) {
          result[user.id] = user;
        }
        //console.log(result);
        return result;
      })*/
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
        //console.log(view);
    }

    logout(){
        for (let callback of this.observers["login"]) {
            callback('');
        }
        this._userLogged= null;
        this.changeView('home');
    }

    get currentView() {
        return this._currentView;
    }

    set currentView(view: string) {
        this._currentView = view;
    }

    get userLogged(){
        return this._userLogged!;
    }

    set userLogged(user: UserInfoI) {
        this._userLogged = user;
        console.log(this.userLogged.nome +" has been set as user");
    }



    login() {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        const body = { id: 'alice.corvetto@cmail.it', logPassword: 'alccrvtt' };
        return this.http.post<UserInfoI | null>(this.basePath + '/user/login', JSON.stringify(body), { headers: headers });
    }

    register(){
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json'
      });
      const body = { name: 'ciccio', surname: 'pasticcio', email: 'cicciopast@cmail.it', password: 'ccopstco', datebirth: '1990-12-11 00:00:00' };
      return this.http.post<UserRegistred | null>(this.basePath + '/user/signup', JSON.stringify(body), {headers: headers});
    }

    updateView(id:string) {
        for (let callback of this.observers["login"])
            callback(id);
        for (let callback of this.observers["view"]) {
            callback('home');
        }
    }

    /*get users(): Promise<UserInfoI[]> {
      return this._users.then((dati) => {
        return Object.values(dati);
      });

    }*/
}
