import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {Empleado} from "../../models/empleado.model"
import { Dep } from '../../models/Dep.model';

@Component({
  selector: 'app-info-grap',
  templateUrl: './info-grap.component.html',
  styleUrls: ['./info-grap.component.css']
})
export class InfoGrapComponent implements OnInit {
   empleados: Empleado[] | string;
   error: string;

   view: any[] = [700, 200];

   single: {name :string, value :number}[] = [];
   

   colorScheme = {
    domain: ['#3333cc', '#9933ff', '#0099cc', '#660033']
  };
  //options
  showLegend = true;
  //pie
  showLabels= true;
  explodeSlices=false;
  doughnut=false;



  constructor(private _route: ActivatedRoute) {
    
    this.empleados = this._route.snapshot.data["EmpleadoList"];

    if(Array.isArray(this.empleados)){
        const index_id = ["1","2","3","4"];
        const index_dep =["IT","DG","FE","IE"];
    
         
        for(let i=0; i < index_dep.length;i++){
          
          this.single.push({

            name : index_dep[i],

            value:   this.empleados.reduce((acc,empleado)=>{
          
              if(empleado.departamento=== index_id[i]) 
              {
                acc = acc + 1;
              }
               return acc       
     
             },0)
          }) 
    
        }

        console.log(this.single);

    }
    else {
      this.error = this.empleados; 
    }


   }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }


  onSelect2(event){
    console.log(event);
  }

}
