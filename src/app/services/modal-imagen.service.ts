import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean = true;
  public tipo?: "usuarios"|"medicos"|"hospitales";
  public id: string = "";
  public img:string ="";

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  
  get ocultarModal(){

    return this._ocultarModal;
  }

  abrirModal(tipo: "usuarios"|"medicos"|"hospitales", id: string, img: string="no-img"){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // this.img = img;
    if(img.includes("https")){
      this.img = img;
    }else{
      //http://localhost:3000/api/upload/usuarios/62ab72f9c1b53a715c993929
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal(){
    this._ocultarModal= true;
  }

  constructor() { }
}
