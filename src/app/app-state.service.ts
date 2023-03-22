import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    private _currentView;

    private observers: { [evento: string]: ((e: string) => void)[] };
   

    constructor(private http: HttpClient) {
        this._currentView = "home";
        this.observers = {};
        this.observers["view"] = [];
    }

    observe(evento: string, callback: (e: string) => void ) {
        console.log("0");
        if (this.observers.hasOwnProperty(evento)) {
          this.observers[evento].push(callback);
        }
    }

    changeView(view:string){
        console.log("2");
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

}