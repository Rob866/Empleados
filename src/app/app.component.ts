import { Component } from '@angular/core';
import {Event,Router,NavigationStart,NavigationEnd, NavigationCancel, NavigationError} from "@angular/router";
import { UpdatepassService } from "./services/updatepass.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadingIndicador = true;
  constructor(private _router:Router,public updatePass :UpdatepassService){

    this._router.events.subscribe((routerEvent: Event)=>{

      if(routerEvent instanceof NavigationStart){
        this.loadingIndicador = true;    
      }
      if(routerEvent instanceof NavigationEnd 
        ||routerEvent instanceof NavigationCancel
        ||routerEvent instanceof  NavigationError){
        this.loadingIndicador =false;
        
      }

    });


  }

  signOut(){

    this.updatePass.adminActive= false;
    this.updatePass.updatePass= null;
    this._router.navigate(["/lista"]);

  }
}
