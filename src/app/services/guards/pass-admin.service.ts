import { Injectable } from '@angular/core';
import  {Resolve,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import {Pass} from "../../models/Pass.model"
import { Observable } from 'rxjs';
import {ListEmpleadoService} from "../../services/list-empleado-service.service";
import { catchError } from 'rxjs/operators';
import  { of}  from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})
export class PassAdminService implements Resolve<Pass | string>{

  constructor(private lista: ListEmpleadoService){

   } 

   resolve( routeActive: ActivatedRouteSnapshot,
    route : RouterStateSnapshot):Observable<Pass| string>{
     return this.lista.getCredenciales().pipe(
      catchError((err:any)=>{
        return of(err);
      }
    ))

   }

}
