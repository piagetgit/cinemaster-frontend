import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    basePath: string = "http://localhost:8080/api/v1/cinemaster";
    userIsLogged:string;
    private _currentView;

    private observers: { [evento: string]: ((e: string) => void)[] };


    constructor(private http: HttpClient) {
        this._currentView = "home";
        this.observers = {};
        this.observers["view"] = [];
        this.observers["login"] = [];
        this.userIsLogged="";
    }

    observe(evento: string, callback: (e: string) => void ) {
        if (this.observers.hasOwnProperty(evento)) {
          this.observers[evento].push(callback);
        }
    }

    changeView(view:string){
        for (let callback of this.observers["view"]) {
            callback(view);
        }
    }

    get currentView() {
        return this._currentView;
    }

    set currentView(view:string) {
        this._currentView=view;
    }

    login():boolean {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        let res = true;
        const body = { id: 'alice.corvetto2@cmail.it', logPassword: 'alccrvtt' };
        this.http.post<string>(this.basePath + '/user/login', JSON.stringify(body), { headers: headers }).subscribe(data => {
            if(String(data)=="true"){
                
                for (let callback of this.observers["login"])
                    callback("userId");
                for (let callback of this.observers["view"]) {
                     callback('home');
                }
                console.log(data)
                this.userIsLogged="userId";
            }
        });
        console.log("ecco1 "+ this.userIsLogged);
        return true;
    }

}
