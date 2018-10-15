import { Injectable } from '@angular/core';
import  {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import {ListEmpleadoService} from "../list-empleado-service.service";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import {of} from "rxjs/internal/observable/of";
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuardService implements CanActivate {
  constructor(private _ListEmpleadoService : ListEmpleadoService,
  private _Route: Router) { }


  canActivate( route:ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean>{
    const id:number = +route.paramMap.get("id"); 
   //const EmpleadoExist = this._ListEmpleadoService.getEmpleado(+route.paramMap.get("id"))
     // me conecto con el servidor... en espera de un respuesta
      return this._ListEmpleadoService.getEmpleado(id).pipe(
      map((empleado)=>{
          const EmpleadoExist = !!empleado;


          if (route.queryParamMap.has("seleccion")){

            const seleccion =   route.queryParamMap.get("seleccion");
        
            if (EmpleadoExist && ( seleccion === "all" || seleccion ==="dep" || seleccion ==="name" )){
             
                 switch(seleccion){
  
                  case "all": {
                        
                       if (route.queryParamMap.has("orden")){
                            const orden = route.queryParamMap.get("orden")
                            if(orden ==="ascendente" || orden ==="descendente"){
                              return true} 
                            else {
                            
                              this._Route.navigate(["/notfound"]);
                              return false;}
                           }
                     else {
                          
                           this._Route.navigate(["/notfound"]);
                           return false;;
                        }
  
                    };
                  case "dep": {
                           if(route.queryParamMap.has("departamento")){
                             
                              const dep = route.queryParamMap.get("departamento");
                        
                             if (dep ==="1" || dep ==="2" || dep ==="3" || dep ==="4"){
                               return true;
  
                             }
                             else {
                              this._Route.navigate(["/notfound"]);
                              return false;
  
                             }
  
  
                           }
                           else {
                             this._Route.navigate(["/notfound"]);
                             return false;
                            
                           }
  
                    };
                  case "name": {
                        return true;
                  };
                 
                }
  
  
            }
            else{
            
               this._Route.navigate(["/notfound"]);
              return false;
  
            }
        
  
          }
  
          else {
            this._Route.navigate(["/notfound"]);
              return false;
  
          }
      

      }),
      catchError((err)=>{
        console.log(err);
        this._Route.navigate(["/notfound"]);
        return of(false)

      })
     )

  }}
