import { AppStateService } from "../services/app-state.service";
import { Component, OnInit } from '@angular/core';
import { UserInfoI } from "../interface/userLoginResponse";
import {Ticket} from "../interface/ticket";
import {AppService} from "../services/app.service";
import {FilmInfoI} from "../interface/film";
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user!:UserInfoI;
  userLogged!: string;
  tickets!:Ticket[];

  films!:FilmInfoI[] | null;

  displayedColumns: string[] = ['id','dataOra','numeroPersone','prezzoTotale','posti','pagato'];

  constructor(private appService:AppService,private appStateService:AppStateService){

  }
  ngOnInit() {
    console.log("user profile  init");
    this.appService.films.then((films)=>{
      this.films=films;
    });
    
    this.user = this.appStateService.userLogged;


    this.appService.loadTicketByUserId(this.appStateService.userLogged.id).then((tickets)=>{
      this.tickets = tickets.sort((t1,t2)=>{
        if (t1.dataOra<t2.dataOra)
          return -1
        else
          return 1
      })
      ///console.log(this.tickets[0]);
    });

  }

}
