import { Component, OnInit,Input, OnChanges,SimpleChanges,Output,EventEmitter,TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
import {Empleado} from "../../models/empleado.model";
import {ActivatedRoute} from"@angular/router"
import {ListEmpleadoService} from "../../services/list-empleado-service.service";
import {UpdatepassService} from "../../services/updatepass.service";

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.css']
})
export class EmpleadoDetailComponent implements OnInit{
  
  @Input("passEmpleado")  empleado: Empleado;
  @Output("sendData") sendData  = new EventEmitter<number>();
  @Output("EditData") DataEdit = new EventEmitter<number>();
  @Output("deleteData") deleteData = new EventEmitter<number>();

  idPassParam :number;
  _display :boolean= false;
  modalRef: BsModalRef;


  constructor(private modalService: BsModalService,private ruta : ActivatedRoute,
    private empleadosService :ListEmpleadoService,public passService :UpdatepassService) { 

  }

  ngOnInit() {
    //this.idPassParam = +this.ruta.snapshot.paramMap.get("id")
    
    this.ruta.paramMap.subscribe((params)=>{
      this.idPassParam = +params.get("id");
      if(this.idPassParam === this.empleado.id){
        this._display =true;
      }

     })
   
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
 

  decline(): void {
    this.modalRef.hide();
  }

   show(){
         this.sendData.emit(this.empleado.id);   
   }

   edit(){
        this.DataEdit.emit(this.empleado.id);    
   }

   delete(){

  this.modalRef.hide();
   this.empleadosService.deleteEmpleado(this.empleado.id).subscribe(
    ()=> {
        console.log(`Empleado cone el id : ${this.empleado.id} Borrado`)  
       },
    (err) => console.log(err)

   )
    this.deleteData.emit(this.empleado.id); 
   }

   mostrar(){
     this._display = !this._display;
   }

 /* 
  ngOnChanges(change :SimpleChanges){
       const anteriorEmpleado = <Empleado>change.empleado.previousValue;
       const currentEmpleado = <Empleado> change.empleado.currentValue;

       console.log("Anterior: "+(anteriorEmpleado? anteriorEmpleado.nombre : "null"));
      console.log("Current: " + currentEmpleado.nombre);
  }*/




}
