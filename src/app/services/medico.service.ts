import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }


  get token() {
    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      headers: {
        "x-token": this.token
      }
    }
  }

  cargarMedicos() {
    const url = `${base_url}/medicos`
    return this.http.get(url, this.headers);
  }

  obtenerMedicoPorId(id: string) {
      const url = `${base_url}/medicos/${id}`
      return this.http.get(url, this.headers);
  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    const url = `${base_url}/medicos`

    return this.http.post(url, medico, this.headers)

  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`

    return this.http.put(url, medico, this.headers)
  }

  eliminarMedico(_id: string) {
    //http://localhost:3000/api/hospitales
    const url = `${base_url}/medicos/${_id}`

    return this.http.delete(url, this.headers)

  }
}
