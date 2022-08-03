import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const base_url = environment.baseUrl;

interface hospitalQueryResult {
  ok: boolean;
  hospitales: Hospital[];
}


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  constructor(private http:HttpClient) { }


  get token(){
    return localStorage.getItem("token") || "";
  }

  get headers(){
    return {
      headers: {
        "x-token": this.token
      }
    }
  }



  cargarHospitales(){
    const url = `${base_url}/hospitales`

    return this.http.get<hospitalQueryResult>(url, this.headers);

  }

  crearHospital(nombre:string){
    const url = `${base_url}/hospitales`

    return this.http.post(url,{nombre}, this.headers)

  }

  actualizarHospital(_id:string, nombre:string){
    const url = `${base_url}/hospitales/${_id}`

    return this.http.put(url,{nombre}, this.headers)
  }

  eliminarHospital(_id:string){
    //http://localhost:3000/api/hospitales
    const url = `${base_url}/hospitales/${_id}`

    return this.http.delete(url,this.headers)

  }

}
