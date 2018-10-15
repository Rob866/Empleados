import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from "@angular/router";
import {ListasEmpladosComponent } from "../Empleados/listas-emplados.component";
import {CrearEmpleadoComponent} from "../Empleados/crear-empleado.component";
import {RouteEmpleadoDetail } from  "../Empleados/componentEmpleado/routeView/route-empleado-detail.component";
import { CanDeactiveGuardService} from "../services/guards/can-deactive-guard.service";
import {EmpleadoListResolveService} from "../services/guards/EmpleadoListResorver.service";
import {  NoFoundComponent } from "../Empleados/noFound/no-found.component";
import{CanActiveGuardService} from "../services/guards/can-active-guard.service";
import{ DeleteComponent} from "../Empleados/confirmDelete/delete.component";
import {InfoGrapComponent} from "../Empleados/InfoGraf/info-grap.component";
import {LoginAppComponent} from "../Empleados/login/login-app.component";
import {PassAdminService} from "../services/guards/pass-admin.service";
import {CanActivePassService } from "../services/guards/can-active-pass.service";
import {UpdatePassComponent} from "../Empleados/UpdatePass/update-pass.component";


const routes:Routes =[
   { path:"",redirectTo:"/lista",pathMatch:"full" },
   { path :"lista", component:ListasEmpladosComponent,
      resolve: { EmpleadoList: EmpleadoListResolveService}},
   { path :"edit/:id", component:CrearEmpleadoComponent,
     canActivate:[CanActivePassService ],
     canDeactivate : [CanDeactiveGuardService]},
   { path :"lista/:id", component :RouteEmpleadoDetail,
    resolve: {EmpleadoList :EmpleadoListResolveService},
    canActivate:[CanActiveGuardService]},
   { path:"display" ,component: InfoGrapComponent,
   resolve: { EmpleadoList :EmpleadoListResolveService}
   },
   {path:"lista/delete/:id",component: DeleteComponent},
   {path :"login",component: LoginAppComponent,
     resolve :{ Credenciales : PassAdminService}
    },{ path :"updatePass", component:UpdatePassComponent ,
    resolve :{ Credenciales : PassAdminService},
    canActivate:[CanActivePassService]},
   { path: "notfound", component: NoFoundComponent },
   { path :"**" ,redirectTo:"/notfound",pathMatch:"full"}
]

@NgModule({
  //{enableTracing:true}
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class RutasModule { }
