import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DatosCompartidosService {

  private personajeDetalles:any;

  private datosCompartidos: any;
  
  setDatos(data: any)
  {
    this.datosCompartidos = data;
  }
  getData() {
    return this.datosCompartidos;
  }

  
  setPersonajeCompartido(data: any):void
  {
    this.personajeDetalles = data;
  }
  getPersonajeCompartido():any {
    return this.personajeDetalles;
  }

  constructor() { }
  
}
