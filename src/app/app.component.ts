import { Component } from '@angular/core';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinemaster';
  view!:string;

  constructor(private appStateService:AppStateService){
    this.view = this.appStateService.currentView;
 
  }

  ngOnInit() {
    this.appStateService.observe("view", (view: string) => {
      this.view = view;
      
      console.log("app"+this.view);
    }
    )
  }
}
