import  {Resolve,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import  { Empleado} from "../../models/empleado.model";

import  {Injectable} from "@angular/core";
import  {ListEmpleadoService} from "../../services/list-empleado-service.service";

import { ResolvedEmpleadoList } from "../../ResolveEmpleadoList/ResolvedEmpleadoList.model";

import {Observable} from "rxjs/observable";
import  { of}  from "rxjs/internal/observable/of";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";

@Injectable()
export class EmpleadoListResolveService implements Resolve<Empleado[] | string>{
constructor(private lista :ListEmpleadoService){
}

resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Empleado[]| string>{
    
 return  this.lista.getEmpleados().pipe(
     catchError((err:any)=>  {
         return of(err)} )
 )
 }
}
