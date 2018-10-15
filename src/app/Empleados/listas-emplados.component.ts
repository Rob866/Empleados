import { Component, OnInit ,Output,EventEmitter, OnDestroy, OnChanges} from '@angular/core';
import { Empleado } from "../models/empleado.model";
import { Router,ActivatedRoute,ActivatedRouteSnapshot } from '@angular/router';
import { ResolvedEmpleadoList} from  "../ResolveEmpleadoList/ResolvedEmpleadoList.model";

import {ListEmpleadoService} from "../services/list-empleado-service.service";
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-listas-emplados',
  templateUrl: './listas-emplados.component.html',
  styleUrls: ['./listas-emplados.component.css']
})
export class ListasEmpladosComponent implements OnInit {
  _bufer: Empleado[];
  //opcion de busqueda
  private _seleccion:string="all";
  //opcion departamento
  private _dep:string="2";
  //opcion name
  private _name:string="";
  //orden
  private _orden:string= "ascendente";
  //error
  error:string;
 
  //---------------------------------------------
  get seleccion():string{ return this._seleccion;}
  set seleccion(value:string){ this._seleccion = value; this.renovarLista()}
  //------------------------------------
  get departamento(){ return this._dep;}
  set departamento(value:string){ this._dep = value; this.renovarLista() ;}
  //-----------------------------------
  get name():string{ return this._name; }
  set name(valor:string){ this._name = valor;this.renovarLista();}
  //---------------------------------------------
  get orden():string{ return this._orden}
  set orden(valor:string){ this._orden =  valor; this.renovarLista()}
 //---------------------------------------------------------------------- 
  empleados :Empleado[];
  _ResolvedEmpleadoList:Empleado[] | string;

  //-----------------------------------------------------------------------
  //variables para las paginacion
  returnedArray: Empleado[];
  currentPage:number=1;


  constructor(private route :Router,private getDataRuta : ActivatedRoute) {
      
          
        this._ResolvedEmpleadoList= this.getDataRuta.snapshot.data["EmpleadoList"];
                      
         if(Array.isArray(this._ResolvedEmpleadoList)) {
           this.empleados = this._ResolvedEmpleadoList;


           if(this.getDataRuta.snapshot.queryParamMap.has("seleccion")){
            this.seleccion = this.getDataRuta.snapshot.queryParamMap.get("seleccion")}
          if(this.getDataRuta.snapshot.queryParamMap.has("orden")){
            this.orden = this.getDataRuta.snapshot.queryParamMap.get("orden");
          }  
          if(this.getDataRuta.snapshot.queryParamMap.has("dep")){
             this.departamento = this.getDataRuta.snapshot.queryParamMap.get("dep");
          }
          if(this.getDataRuta.snapshot.queryParamMap.has("name")){
            this.name = this.getDataRuta.snapshot.queryParamMap.get("name");
          }
          if(this.getDataRuta.snapshot.queryParamMap.has("page")){
            this.currentPage = +this.getDataRuta.snapshot.queryParamMap.get("page"); 
          }

         }else {
          this.error = this._ResolvedEmpleadoList;
          
         }
              
        }

  ngOnInit() {
  
  this.renovarLista();
  

  }

  renovarLista(){
    this.returnedArray =this.functionBuffer().slice(0, 10);

  }


  functionBuffer(){
  

    if (Array.isArray(this._ResolvedEmpleadoList)){
    switch(this.seleccion){
      case "all": {
         
        if(this.orden ==="ascendente"){

           return  this.empleados.sort((a,b)=>{
                              if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1 ;else return 1 
                           })}
        else {
             return this.empleados.sort((a,b)=>{
                  if(a.nombre.toLowerCase() < b.nombre.toLowerCase())  return 1 ; else return -1; 
              })
    }}
      case "dep": {

        if(this.orden ==="ascendente"){

          this.empleados.sort((a,b)=>{
                             if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1 ;else return 1 
                          })}
       else {
            this.empleados.sort((a,b)=>{
                 if(a.nombre.toLowerCase() < b.nombre.toLowerCase())  return 1 ; else return -1; 
             })
       }

        return this.empleados.filter((empleado:Empleado)=>{
          return empleado.departamento === this.departamento;
     })
      }
      default : {
        if(this.orden ==="ascendente"){

           this.empleados.sort((a,b)=>{
                             if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1 ;else return 1 
                          })}
       else {
           this.empleados.sort((a,b)=>{
                 if(a.nombre.toLowerCase() < b.nombre.toLowerCase())  return 1 ; else return -1; 
             })
        }
         
        return this.empleados.filter((empleado:Empleado)=>{
          const _name = this.name.toLocaleLowerCase();
          return empleado.nombre.toLowerCase().includes(_name);
        
        })}
    
    }
  }
  }


  pageChanged(event: PageChangedEvent){
    this.currentPage = event.page;
    const startItem = (this.currentPage- 1) * event.itemsPerPage;
    const endItem = this.currentPage * event.itemsPerPage;
    this.returnedArray = this.functionBuffer().slice(startItem, endItem);
  }

 
  changeRuta(id: number){
 
    if(this.seleccion ==="dep"){
      console.log(id); 
      
      this.route.navigate(['/lista',id],{
        queryParams: {
        seleccion : this.seleccion,
        departamento : this.departamento,
        page : this.currentPage}
      });

    } 

    else if(this.seleccion === "all") {
      this.route.navigate(['/lista',id],{
        queryParams: {
        seleccion : this.seleccion,
        orden : this.orden,
       page :this.currentPage}
      });

    }

    else if(this.seleccion ==="name"){
      this.route.navigate(['/lista',id],{
        queryParams: {
          seleccion : this.seleccion,
          name : this.name,
         page: this.currentPage}
        })
      }

    }





    rutaEdit(id:number){
      
      this.route.navigate(['/edit',id]);
  }

  deleteEmpleado(id:number){

  console.log("evento recibido:",id); 
  
  if(this.seleccion ==="dep"){
    console.log(id); 
    
    this.route.navigate(['/lista/delete',id],{
      queryParams: {
      seleccion : this.seleccion,
      departamento : this.departamento}
    });

  } 

  else if(this.seleccion === "all") {
    this.route.navigate(['/lista/delete',id],{
      queryParams: {
      seleccion : this.seleccion,
      orden : this.orden}
    });

  }

  else if(this.seleccion ==="name"){
    this.route.navigate(['/lista/delete',id],{
      queryParams: {
        seleccion : this.seleccion,
        name : this.name}
      })
    }  
    }
}

