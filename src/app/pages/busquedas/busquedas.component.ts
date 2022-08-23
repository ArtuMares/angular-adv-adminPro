import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public hospitales:Hospital[] =[];
  public medicos:Medico[] =[];
  public usuarios:Usuario[] =[];
  
  constructor(private ar:ActivatedRoute,private bs:BusquedasService) { }


  ngOnInit(): void {
    this.ar.params.subscribe(({termino}) =>{
      this.getBusquedaGlobal(termino);
    })
  }


  getBusquedaGlobal(termino:string){
    this.bs.busquedaGlobal(termino).subscribe((resp:any) =>{
      console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
    });
  }

}
