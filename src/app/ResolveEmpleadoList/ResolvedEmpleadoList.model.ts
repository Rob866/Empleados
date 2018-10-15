import {Empleado}  from "../models/empleado.model";

export class ResolvedEmpleadoList {
    constructor(public employeeList: Empleado[], public error: any = null) { }
}