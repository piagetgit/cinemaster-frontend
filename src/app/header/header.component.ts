import { AppStateService } from './../app-state.service';
import { MatButtonModule } from '@angular/material/button';
import { Component, NgModule, OnInit } from '@angular/core';


const MaterialComponents = [MatButtonModule];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private appStateService:AppStateService){

  }

  changeViewToSignin(event:Event){
   // event.preventDefault();
    this.appStateService.changeView('signin');
    
  }

  ngOnInit() {
    this.appStateService.observe("view", (view: string) => {
      this.appStateService.currentView=view;
    })
  }
}
