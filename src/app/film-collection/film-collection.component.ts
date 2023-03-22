import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FilmInfoI } from '../interface/film';

@Component({
  selector: 'app-film-collection',
  templateUrl: './film-collection.component.html',
  styleUrls: ['./film-collection.component.css']
})
export class FilmCollectionComponent implements OnInit{
  films!:FilmInfoI[];
  
  constructor(private appService:AppService){

  }
  
  ngOnInit() {
    this.appService.films.then((films)=>{
      this.films=films; 
      console.log(this.films[0].descrizione)
    });
  }
  

}
