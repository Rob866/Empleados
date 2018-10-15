import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
id:number;
seleccion:string;
orden:string;
departamento:string;
name:string;

  constructor(private getDataRuta: ActivatedRoute,
  private router:Router) {

   if(this.getDataRuta.snapshot.paramMap.has("id")){
      this.id= +this.getDataRuta.snapshot.paramMap.get("id");
   }

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

   }



  ngOnInit() {
  }



  regresar(){


    if(this.seleccion === "all"){

      this.router.navigate(["/lista"],{
        queryParams : { seleccion : this.seleccion,
                        orden: this.orden}
  
      });
    
    }else if (this.seleccion === "dep"){
      this.router.navigate(["/lista"],{
        queryParams : { seleccion : this.seleccion,
          dep: this.departamento}  
      });
    }
    else if(this.seleccion === "name"){
  
     this.router.navigate(["/lista"],{
       queryParams: {seleccion : this.seleccion,
        name : this.name }
     })
  
    }

  }


}
