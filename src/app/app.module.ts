import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { ListasEmpladosComponent } from './Empleados/listas-emplados.component';
import {RutasModule } from './rutas/rutas.module';
import { CrearEmpleadoComponent } from"./Empleados/crear-empleado.component";
import {FormsModule} from "@angular/forms";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {CanDeactiveGuardService} from './services/guards/can-deactive-guard.service';
import { SelectRequiredValidatorDirective } from './directives/select-validator.directive';
import { ListEmpleadoService} from "./services/list-empleado-service.service";
import { EmpleadoDetailComponent } from "./Empleados/componentEmpleado/empleado-detail.component";
import { RouteEmpleadoDetail } from './Empleados/componentEmpleado/routeView/route-empleado-detail.component';

import {EmpleadoListResolveService} from "./services/guards/EmpleadoListResorver.service";
import { NoFoundComponent } from './Empleados/noFound/no-found.component';

import {CanActiveGuardService} from "../app/services/guards/can-active-guard.service";
import {PaginationModule} from "ngx-bootstrap/pagination";
import { ModalModule } from 'ngx-bootstrap/modal';
import { DeleteComponent } from './Empleados/confirmDelete/delete.component';
import { InfoGrapComponent } from './Empleados/InfoGraf/info-grap.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginAppComponent } from './Empleados/login/login-app.component';
import { UpdatePassComponent } from './Empleados/UpdatePass/update-pass.component';
@NgModule({
  declarations: [
    AppComponent,
    ListasEmpladosComponent,
    CrearEmpleadoComponent,
    SelectRequiredValidatorDirective,
    EmpleadoDetailComponent,
    RouteEmpleadoDetail,
    NoFoundComponent,
    DeleteComponent,
    InfoGrapComponent,
    LoginAppComponent,
    UpdatePassComponent
  ],
  imports: [
    BrowserModule,
    RutasModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [ListEmpleadoService,CanDeactiveGuardService,EmpleadoListResolveService,CanActiveGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
