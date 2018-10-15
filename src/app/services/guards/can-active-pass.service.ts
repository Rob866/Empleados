import { Injectable } from '@angular/core';
import {UpdatepassService } from "../updatepass.service"
import {CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router"
import { Observable } from 'rxjs/Observable';
import {of}  from "rxjs/internal/observable/of"

@Injectable({
  providedIn: 'root'
})
export class CanActivePassService  implements CanActivate{

  constructor(private UpdatePass: UpdatepassService,
  private router :Router) { }


 
  canActivate(route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot):boolean {



  if(this.UpdatePass.adminActive)  return true
  else {
   this.router.navigate(["/lista"]);  
   return false;
  } }



}
