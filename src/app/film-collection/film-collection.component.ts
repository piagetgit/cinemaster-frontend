import { AppStateService } from './../services/app-state.service';
import { AppService } from '../services/app.service';
import { Component, OnInit } from '@angular/core';
import { FilmInfoI } from '../interface/film';

@Component({
  selector: 'app-film-collection',
  templateUrl: './film-collection.component.html',
  styleUrls: ['./film-collection.component.css']
})
export class FilmCollectionComponent implements OnInit{
  films!:FilmInfoI[];
  
  constructor(private appService:AppService,private appStateService:AppStateService){

  }
  
  ngOnInit() {
    this.appService.films.then((films)=>{
      this.films=films; 
    });
  }

  toTicket(film:FilmInfoI){
    if(this.appStateService.userLogged!== null && this.appStateService.userLogged !== undefined){
      this.appStateService.filmToPay = film;
      this.appStateService.changeView('tickets');
      
    }
    else{
      this.appStateService.changeView('signin');
    }
      
  }
}
