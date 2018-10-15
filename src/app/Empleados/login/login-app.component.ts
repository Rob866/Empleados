import { Component, OnInit,ViewChild} from '@angular/core';
import { Pass} from "../../models/Pass.model";
import { NgForm } from "@angular/forms";
import {ListEmpleadoService } from "../../services/list-empleado-service.service";
import { catchError } from "rxjs/operators/catchError";
import { map } from "rxjs/operators/map";
import { ActivatedRoute}  from "@angular/router"
import {UpdatepassService} from "../../services/updatepass.service"
import {Router}  from "@angular/router";

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {
 @ViewChild("adminForm")  public adminForm: NgForm;

  showData :boolean = false;
  credenciales ={
            usuario: null,
            password:null
  }
  
 ResolvePass : Pass | string; 
 pass: Pass;

 show:boolean=false;

  constructor(private _route: ActivatedRoute,private pasService : UpdatepassService,private route :
  Router) {
       this.ResolvePass =this._route.snapshot.data["Credenciales"];
       if(typeof this.ResolvePass === "object"){
          this.pass= this.ResolvePass;
           console.log(" recepcion exitosa!");
        
       }
       else {
        console.log("Error");
       }

  }

  ngOnInit() {
  }

 save(){
   if(this.pass.admin === this.credenciales.usuario && this.pass.pass ===this.credenciales.password){
     console.log("entrada exitosa!!!!")
     this.adminForm.reset();
     this.pasService.updatePass= {user: this.pass.admin , pass :this.pass.pass};
     this.pasService.adminActive= true;
     this.route.navigate(["/lista"]);

   }
   else {
     console.log("acceso  restringido!!!")
     this.show= true;
     this.setTimer(1000)

   }
  
 }

  showForm(){
    
    this.showData = !this.showData;
  }


  setTimer(time:number){
    setTimeout(()=>{
      this.show= false;
    },time)
  }

}
