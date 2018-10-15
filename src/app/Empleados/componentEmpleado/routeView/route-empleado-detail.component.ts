import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";
import {Router} from "@angular/router";
import {Empleado} from "../../../models/empleado.model";
import {  ListEmpleadoService} from "../../../services/list-empleado-service.service";
import {ResolvedEmpleadoList } from "../../../ResolveEmpleadoList/ResolvedEmpleadoList.model";

@Component({
  selector: 'app-route-empleado-detail.component',
  templateUrl: './route-empleado-detail.component.html',
  styleUrls: ['./route-empleado-detail.component.css']
})
export class RouteEmpleadoDetail implements OnInit {
  //opciones pre route
  dataPreRoute :{
    seleccion:string,
    departamento?:string,
    name?:string,
    orden?:string,
    page:number }= {
      seleccion: "",
      page:1
    }

  private  id:number;
  empleado :Empleado;
  empleados:Empleado[];
  BlockRecarga :boolean=true;
  error:string;
  constructor(private route : ActivatedRoute ,private  listaEmpleados : ListEmpleadoService,
  private nextRoute: Router) { 


    //cargo mi empledoslist desde el server
    //y no se  visualiza mi compoenente hasta que me regrese la ejecucion del observable
    //this.empleados = this.route.snapshot.data["EmpleadoList"];
        
    const _ResolvedEmpleadoList: Empleado[] | string= this.route.snapshot.data["EmpleadoList"];
      

         if(Array.isArray(_ResolvedEmpleadoList)){
          

           this.empleados = _ResolvedEmpleadoList;

           this.route.paramMap.subscribe((params)=>{
           this.id = +params.get("id");
           this.empleado = this.empleados.find((empleado)=>{ return  empleado.id === this.id});


          //this.id = this.route.snapshot.paramMap["id"];
          //get de id tiene que ser un observable
          //por que no solo se modifica cuando se cambia de ruta(de empleadosList a empleadosdeteail)
          //cuando se crea el componente...
          //si no tambien desde el mismo  empladosDetail 

  
          if(this.route.snapshot.queryParamMap.has("seleccion")){
          const selector = this.route.snapshot.queryParamMap.get("seleccion");
          switch(selector){
        
              case "all":{
                const  _orden = this.route.snapshot.queryParamMap.get("orden");
                const  _page = +this.route.snapshot.queryParamMap.get("page");
                this.dataPreRoute= {
                      seleccion :selector,
                      orden: _orden,
                      page: _page};
                break;
              }
              case "dep":{
                const  _departamento= this.route.snapshot.queryParamMap.get("departamento");
                const  _page = +this.route.snapshot.queryParamMap.get("page");
                this.dataPreRoute= {
                          seleccion :selector,
                          departamento : _departamento,
                          page: _page}
                break;
              }
              case "name":{
                const  _name= this.route.snapshot.queryParamMap.get("name");
                const  _page = +this.route.snapshot.queryParamMap.get("id")
                this.dataPreRoute= {seleccion : selector,
                name : _name,
                page : _page}} 
      } }  }) 

         }else {
           
           this.error = _ResolvedEmpleadoList;

        } 
  }

  ngOnInit() {
 
      
    }

    nextEmpleado(){
     let next_id :number;
    //checo la position  en el  array del empleado
    
       if(this.dataPreRoute.seleccion === "all"){

        let current_position:number=0;
        
            let cantidadEmpleados:number = this.empleados.length;

              for(let i=0;i < cantidadEmpleados;i++){
                  if(this.empleados[i].id === this.id){current_position=i}
          } 

    
        if(current_position < cantidadEmpleados - 1){
                current_position = current_position + 1;
         } else {current_position= 0;}
         
       
             next_id =this.empleados[current_position].id;
      

       }

       else if(this.dataPreRoute.seleccion =="dep"){
        
        let current_position:number=0;
        let empleadosDep:Empleado[] = this.empleados.filter((empleado:Empleado)=>{
              return empleado.departamento ===  this.dataPreRoute.departamento;
          })
      
        
        const cantidadEmpleados: number = empleadosDep.length;
    
        for(let i=0;i < cantidadEmpleados;i++){
            if(empleadosDep[i].id === this.id){current_position=i}
           }
           
        if(current_position < cantidadEmpleados - 1){
                current_position = current_position + 1;
         } else {current_position= 0;}
             
         next_id=  empleadosDep[current_position].id;

       }


    else if (this.dataPreRoute.seleccion ==="name"){

      let current_position:number=0;
    
      let empleadosName :Empleado[]=  this.empleados.filter((empleado:Empleado)=>{
              return empleado.nombre.toLowerCase().includes(this.dataPreRoute.name);
        
             })
      
       
      
      const cantidadEmpleados: number = empleadosName.length;
  
      for(let i=0;i < cantidadEmpleados;i++){
          if(empleadosName[i].id === this.id){current_position=i}
         }
  
  
      if(current_position < cantidadEmpleados - 1){
              current_position = current_position + 1;
       } else {current_position= 0;}
           
       next_id=  empleadosName[current_position].id;
      }

      this.id= next_id;
      this.empleado = this.empleados.find((empleado)=>{ return  empleado.id === next_id});
      //this.nextRoute.navigate(['/lista',next_id]);
    

  }


    preEmpleado(){
      let next_id:number;
      
        if(this.dataPreRoute.seleccion=="all"){

      //checo la position  en el  array del empleado
      let current_position:number=0;
    
   
      const cantidadEmpleados: number = this.empleados.length;

      for(let i=0;i < cantidadEmpleados;i++){
        if(this.empleados[i].id === this.id){current_position=i}
       }

      if(current_position > 0){
        current_position= current_position - 1;
      }else { current_position= this.empleados.length -1 }
     
      next_id =  this.empleados[current_position].id;
 
        }


      else if (this.dataPreRoute.seleccion ==="dep"){
        //checo la position  en el  array del empleado
      let current_position:number=0;
      let empleadosDep:Empleado[] = this.empleados.filter((empleado:Empleado)=>{
          return empleado.departamento ===  this.dataPreRoute.departamento;
        })
      
      const cantidadEmpleados: number = empleadosDep.length;

      for(let i=0;i < cantidadEmpleados;i++){
        if(empleadosDep[i].id === this.id){current_position=i}
       }

      if(current_position > 0){
        current_position= current_position - 1;
      }else { current_position=  cantidadEmpleados -1 }
     
      next_id =  empleadosDep[current_position].id;
     }   


    else if (this.dataPreRoute.seleccion ==="name"){
      //checo la position  en el  array del empleado
    let current_position:number=0;
    let empleadosName: Empleado[]= this.empleados.filter((empleado:Empleado)=>{
        return empleado.nombre.toLowerCase().includes(this.dataPreRoute.name);

       })
        
    
    const cantidadEmpleados: number = empleadosName.length;

    for(let i=0;i < cantidadEmpleados;i++){
      if(empleadosName[i].id === this.id){current_position=i}
     }

    if(current_position > 0){
      current_position= current_position - 1;
    }else { current_position=  cantidadEmpleados -1 }
   
    next_id =  empleadosName[current_position].id;

    
   }  
 
    this.id= next_id; 
    this.empleado = this.empleados.find((empleado)=>{ return  empleado.id === next_id});
    
    //this.nextRoute.navigate(['/lista',next_id]);
 
    

    }

    navList(){

   if(this.dataPreRoute.seleccion === "all"){

    this.nextRoute.navigate(["/lista",{ id: this.empleado.id}],{
      queryParams : { seleccion : this.dataPreRoute.seleccion,
                      orden: this.dataPreRoute.orden,
                      page : this.dataPreRoute.page}

    });
  
  }else if (this.dataPreRoute.seleccion === "dep"){
    this.nextRoute.navigate(["/lista",{id: this.empleado.id,}],{
      queryParams : { seleccion : this.dataPreRoute.seleccion,
        dep: this.dataPreRoute.departamento,
        page : this.dataPreRoute.page}  
    });
  }
  else if(this.dataPreRoute.seleccion === "name"){

   this.nextRoute.navigate(["/lista",{id:this.empleado.id}],{
     queryParams: {seleccion : this.dataPreRoute.seleccion,
      name : this.dataPreRoute.name,
      page : this.dataPreRoute.page}
   })

  }


  
    


    }



}
