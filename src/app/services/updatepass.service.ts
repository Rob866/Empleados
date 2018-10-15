import { Injectable } from '@angular/core';
import { Pass } from "../models/Pass.model";


@Injectable({
  providedIn: 'root'
})
export class UpdatepassService {  
  updatePass  : { user:string,pass:string} = null;
  adminActive : boolean = false;
  constructor() { }

}
