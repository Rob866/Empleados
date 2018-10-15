import { Component, OnInit,HostListener,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import {Dep} from "../models/Dep.model";
import { Empleado } from "../models/empleado.model";
import { Router, ActivatedRoute } from '@angular/router';
import {ListEmpleadoService} from "../services/list-empleado-service.service"

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
 
previewPhoto = false; 
_titulo :string;

empleado : Empleado; 

 listaDep: Dep[]=[{id :"1",name: "IT"},
                  {id: "2",name: "DG"},
                  {id: "3",name: "FE"},
                  {id: "4",name: "IE" } ];

@ViewChild("empleadoForm") public crearEmpleadoForm :NgForm;

@ViewChild(BsDatepickerDirective) datapicker: BsDatepickerDirective;        



 constructor(private _route :ActivatedRoute,private listEmpleados: ListEmpleadoService,private route:Router) {
   

  }

  ngOnInit() {
    this._route.paramMap.subscribe((params)=>{
      if(params.has("id")){
        const id:number = +params.get("id")
        this.getEmpleado(id)
      }})
  }

   getEmpleado(id:number){
      if(id === 0) {
      this._titulo ="CREAR EMPLEADO";
      this.empleado = {
      id:null,
      nombre: null,
      genero: null,
      contactPreferencias:null,
      email : null,
      numeroTelefono:null,
      fechaNacimiento: null,
      departamento:"-1",
      estaActivo: false,
      fotoPath: null
     
    }
    //this.empleado.contactPreferencias = null;
    this.previewPhoto=false;
    if(this.crearEmpleadoForm) this.crearEmpleadoForm.reset();
  }
  else{
    this._titulo = "EDITAR EMPLEADO";
    
    //this.empleado = Object.assign({},this.listEmpleados.getEmpleado(id));
     this.listEmpleados.getEmpleado(id).subscribe(
       (empleado) =>{this.empleado = empleado},
      (err) => console.log(err)
     )

  }
   }

   

  save(empForm:NgForm){
    // creamos una copia  de empleado
    //const newEmpleado = Object.assign({},this.empleado);
     if(this.empleado.id == null ){
    this.listEmpleados.addEmpleado(this.empleado).subscribe(
      (empleado)=>{
        console.log(empleado);
        this.previewPhoto=false;
        this.crearEmpleadoForm.reset();
        this.route.navigate(["/lista"]);
      },
      (error:any) => console.log(error)
    );
  }
    else {
      this.listEmpleados.updataEmpleado(this.empleado).subscribe(
        ()=>{
        this.previewPhoto=false;
        this.crearEmpleadoForm.reset();
        this.route.navigate(["/lista"]);

        },
        (err)=>{
          console.log(err)
        }
      )






    }
  }
   
    
  togglePhotoPreview(){
    this.previewPhoto = !this.previewPhoto;
  }

  }




