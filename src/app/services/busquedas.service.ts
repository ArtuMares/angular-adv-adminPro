import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  constructor(private http:HttpClient) { }


  get token(){
    return localStorage.getItem("token");
  }

  get headers(){
    return {
      headers: {
        "x-token": this.token!
      }
    }
  }

  private transformarUsuarios(resultados:any[]):Usuario[]{
    return resultados.map(usr => new Usuario(usr.nombre, usr.email, "",  usr.img, usr.google, usr.role, usr.uid ))
  }

  private transformarHospitales(resultados:any[]):Hospital[]{
    return resultados;
  }

  private transformarMedicos(resultados:any): Medico[]{
  return resultados;
  }
  
  busquedaGlobal(termino:string){
    // http://localhost:3000/api/busquedas/Rob
    const url = `${base_url}/busquedas/${termino}`;
    return this.http.get<any[]>(url, this.headers)
  }

  buscar(tipo: "usuarios"| "medicos" | "hospitales",
         termino:string ){

      // http://localhost:3000/api/busquedas/coleccion/usuarios/m
    const url = `${base_url}/busquedas/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp:any) => {
        switch (tipo) {
          case "usuarios":
              return this.transformarUsuarios(resp.resultados);
          break;
          case "hospitales":
              return this.transformarHospitales(resp.resultados);
            break;
            case "medicos":
              return this.transformarMedicos(resp.resultados);
            break;
          default:
          return
        }
      
      })
    )
  }
}
