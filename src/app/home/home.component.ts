import { Component, OnInit } from '@angular/core';
import { FilmInfoI } from '../interface/film';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  films!:FilmInfoI[];
  
  constructor(private appService:AppService){

  }
  
  ngOnInit() {
    this.appService.films.then((films)=>{
      this.films = [...films];
      //this.films.forEach((f)=> f.img="/assets/images/"+f.img);
    });
  }

}
