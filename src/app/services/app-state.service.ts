import { FilmInfoI } from './../interface/film';
import { UserSignUpResponse } from './../interface/userSignupResponse';
import { UserInfoI } from './../interface/userLoginResponse';
import { HttpClient, HttpHeaders ,HttpResponse,HttpErrorResponse ,HttpHeaderResponse} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    //private basePath: string = "http://localhost:8080/api/v1/cinemaster";
    private basePath: string = "http://localhost/CineMasterBackendPHP/api_server/api"
    private _userLogged!: UserInfoI | null;
    private _currentView;
    filmToPay!:FilmInfoI;

    private observers: { [evento: string]: ((e: string) => void)[] };


    constructor(private http: HttpClient) {
        this._currentView = "home";
        this.observers = {};
        this.observers["view"] = [];
        this.observers["login"] = [];

      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json'
      });
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



    login(email:string,password:string) {
        const headers = new HttpHeaders({
            /*'Accept': 'application/json',
            'Content-type': 'application/json'*/
        });

        //const body = { id: email, logPassword: password };
        const body = { email: email, password: password };
        //return this.http.post<UserInfoI | null>(this.basePath + '/user/login', JSON.stringify(body), { headers: headers });
        //return this.http.post<UserInfoI | null |undefined>(this.basePath+"/signin.php", JSON.stringify(body), { headers: headers });
        return this.http.post(this.basePath+"/signin.php", JSON.stringify(body), { observe: 'response' });
    
    }

    registration(email:string,password:string,nome:string,cognome:string,dataNascita:string){
      const headers = new HttpHeaders({
        /*'Accept': 'application/json',
        'Content-type': 'application/json'*/
      });
      const body = { first_name: nome, surname: cognome, email: email, password: password, date_of_birth: dataNascita ,role:'utente' };
      console.log(JSON.stringify(body));
      return this.http.post<UserSignUpResponse | null>(this.basePath + '/signup.php', JSON.stringify(body), {headers: headers});
    }

    updateView(id:string) {
        for (let callback of this.observers["login"])
            callback(id);
        for (let callback of this.observers["view"]) {
            callback('home');
        }
    }
}
