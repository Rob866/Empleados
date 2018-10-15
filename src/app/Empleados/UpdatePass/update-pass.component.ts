import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Pass} from "../../models/Pass.model";
import { NgForm } from '@angular/forms';
import {ListEmpleadoService} from  "../../services/list-empleado-service.service";
import {UpdatepassService} from "../../services/updatepass.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css']
})
export class UpdatePassComponent implements OnInit {

@ViewChild("adminForm")  adminForm :NgForm;

  receptPass : Pass | string;

   credenciales :{user:string,pass:string} ={
     user : null,
     pass :null
   }

   newCredenciales :{admin:string,pass:string};

   passRecib:Pass;

   testForm:boolean =true;
   show:boolean = false;


  constructor(private _route :ActivatedRoute, private listService :ListEmpleadoService,
    private accessAdmin: UpdatepassService,private  router :Router) { 
    this.receptPass =  this._route.snapshot.data["Credenciales"];

    if( typeof this.receptPass === "object"){
      this.passRecib = this.receptPass;
    }
    else{
      console.log("error en recepcion!!")
    }


  }

  ngOnInit() {
  }


  testPass(dataAcces:string){

  if(dataAcces ==="testPass"){
    if(this.credenciales.user === this.passRecib.admin && this.credenciales.pass === this.passRecib.pass){
      this.testForm= false;
      this.credenciales.pass=null;
      this.credenciales.pass=null;
      this.adminForm.reset();
      console.log("los passwords coinciden!")

    }
    else{
      this.show = true;
      this.setTimer(1000);

    }
  }

    else {

      this.newCredenciales = {
          admin :this.credenciales.user,
          pass : this.credenciales.pass
      }
    
  
     this.listService.updateCredenciales(this.newCredenciales).subscribe(
       ()=>{
              this.adminForm.reset();
              console.log("dato listo para cargarse!!");
              this.accessAdmin.adminActive=false;
              this.accessAdmin.updatePass= null;
              this.router.navigate(["/lista"])

       },
       (err)=>{
         console.log(err)
       }
     
      )

    
    }

  }


  setTimer(time:number){
    setTimeout(()=>{
       this.show= false;
    },time)
  }


  }





