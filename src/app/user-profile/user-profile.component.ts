import { AppStateService } from "../services/app-state.service";
import { Component, OnInit } from '@angular/core';
import { UserInfoI } from "../interface/userLoginResponse";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user!:UserInfoI;
  userLogged!: string;

  constructor(private appStateService:AppStateService) {
  }

  ngOnInit() {
    this.appStateService.observe("login", (userId: string) => {
      this.userLogged = userId;
    });
    this.appStateService.users.then((users)=>{
      for(let user of users) {
        if(this.userLogged.length>0 && user.email===this.userLogged)
          this.user = user;
      }
    });
    this.userLogged = "";
  }
}
