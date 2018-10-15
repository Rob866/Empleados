import  { Injectable } from '@angular/core';
import  {Empleado }   from "../models/empleado.model";
import  {Observable}  from "rxjs/observable";
import  {delay,catchError} from "rxjs/operators";

import {throwError} from "rxjs/internal/observable/throwError";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import "rxjs/add/operator/catch";
import {Pass} from "../models/Pass.model"


@Injectable({
  providedIn: 'root'
})
export class ListEmpleadoService {


  baseUrl :string = "http://localhost:3000/empleados";
  basePass:string = "http://localhost:3000/acceso";

  constructor(private httpClient : HttpClient) { }

        public getEmpleados() :Observable<Empleado[]>{
        
          return this.httpClient.get<Empleado[]>(this.baseUrl)
                                  .pipe(catchError(this.TakeError));            
        }

        public getEmpleado (id):Observable<Empleado>{
         return  this.httpClient.get<Empleado>(`${this.baseUrl}/${id}`).pipe(
           catchError(this.TakeError));
         //return this.empleados.find((empleado)=>{ return  empleado.id === id});
          }


        public  getCredenciales():Observable<Pass>{
           return this.httpClient.get<Pass>(this.basePass).pipe(
             catchError(this.TakeError))
           
        }  
        
        
        public updateCredenciales(credenciales) :Observable<void>{

          return this.httpClient.put<void>(`${this.basePass}`,credenciales,{
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
           }).pipe(catchError(this.TakeError))
          
        }
        

      addEmpleado(empleado:Empleado):Observable<Empleado>{
       if(empleado.fotoPath === null || empleado.fotoPath ===""){
            switch(empleado.genero){
                  case "hombre": { empleado.fotoPath = "assets/imagenes/hombre.jpg"; break;}
                  case "mujer" :{ empleado.fotoPath= "assets/imagenes/mujer.jpg";  break}
       }}
      
        return this.httpClient.post<Empleado>(this.baseUrl,empleado,{
           headers : new HttpHeaders ({
             "Content-Type" :"application/json"
           })
       }).pipe(catchError(this.TakeError))

      }

      updataEmpleado(empleado:Empleado): Observable<void>{
        if(empleado.fotoPath === null || empleado.fotoPath ===""){
          switch(empleado.genero){
                case "hombre": { empleado.fotoPath = "assets/imagenes/hombre.jpg"; break;}
                case "mujer" :{ empleado.fotoPath= "assets/imagenes/mujer.jpg";  break}
     }}

        return this.httpClient.put<void>(`${this.baseUrl}/${empleado.id}`,empleado,{
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
         }).pipe(catchError(this.TakeError))
  
       
      }


      public deleteEmpleado (id:number) : Observable<void>{
          return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
            catchError(this.TakeError)
      )   
      
      
      }

  private TakeError(errorResponse : HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error("Error en el cliente :",errorResponse.error.message);} 
      else{
      console.error("Error en el servidor: ",errorResponse);}
    return throwError("Hay un problema con el servicio....Estamos trabajando para solucionarlo");}

}
