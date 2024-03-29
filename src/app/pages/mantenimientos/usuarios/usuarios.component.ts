import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('txtTermino') txtTermino?:ElementRef;

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true
  private timeout:any;

  private imgSubs?:Subscription;

  constructor(private us: UsuarioService, private bs: BusquedasService, private mis:ModalImagenService, private ar:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.mis.nuevaImagen.pipe(delay(100)).subscribe(img =>{
      this.cargarUsuarios();
    });
  }
  ngAfterViewInit(): void {
    this.ar.params.subscribe(({usuario}) =>{
      if(usuario){ 
        this.buscar(usuario);
        this.txtTermino!.nativeElement.value = usuario;
        }
    });
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }
  cargarUsuarios() {
    this.cargando = true
    this.us.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuario = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuario) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.cargando =true;
      if (termino.trim().length < 1) {
        return this.cargarUsuarios();
      }
      this.bs.buscar("usuarios", termino.trim())
      .subscribe((resultados:any) => {
        this.usuarios = resultados!;
        this.cargando =false;
      });
      return;
    }, 500);
  }

  cambiarRole(usuario:Usuario){
    this.us.guardarUsuario(usuario).subscribe(resp=>{console.log(resp);
    });
  } 

  eliminarUsuario(usuario:Usuario){
    if(usuario.uid == this.us.usuario?.uid){
      return Swal.fire(
        'Error',
        'No puede borrarse a sí mismo',
        "error"
      ) 
    }

    Swal.fire({
      title: 'Borrar',
      text: `Está seguro de que desea borrar al usuario: ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.us.eliminarUsuario(usuario).subscribe({
          next: (resp) =>{
            this.cargarUsuarios();
            Swal.fire(
              'Borrado',
              `El usuario ${usuario.nombre} ha sido borrado`,
              'success'
            )
           }, 
          error: ()=>{Swal.fire(
            'Error',
            'El usuario no ha podido ser borrado',
            "error"
          ) }
        });
      }
    }) 
    return;
  }

  abrirModal(usuario:Usuario){
    this.mis.abrirModal("usuarios", usuario.uid!, usuario.img);
  }
}
