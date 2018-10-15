import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {CrearEmpleadoComponent} from "../../Empleados/crear-empleado.component";

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveGuardService  implements CanDeactivate<CrearEmpleadoComponent>{

  canDeactivate(component:CrearEmpleadoComponent ): boolean{
      if(component.crearEmpleadoForm.dirty){
        return confirm("Deseas descartar los cambios ?");
      }
      return true;

  }
  constructor() { }
}
