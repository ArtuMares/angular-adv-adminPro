import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';


import { BusquedasService } from '../../../services/busquedas.service';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  constructor(private ms: MedicoService, private mis: ModalImagenService, private bs: BusquedasService, private us: UsuarioService) { }

  get userRole(){
    return this.us.role;
  }

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs?: Subscription;
  private timeout:any;

  ngOnInit(): void {

    this.cargarMedicos();
    this.imgSubs = this.mis.nuevaImagen.pipe(delay(100)).subscribe(img => {
      this.cargarMedicos();
    });
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  cargarMedicos() {
    this.cargando = true;
    this.ms.cargarMedicos().subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  };

  abrirModal(medico: Medico) {
    this.mis.abrirModal("medicos", medico._id!, medico.img);

  }

  buscar(termino: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.cargando =true;
      if (termino.trim().length < 1) {
        return this.cargarMedicos();
      }
      this.bs.buscar("medicos", termino.trim())
      .subscribe(resultados => {
        this.medicos = resultados!;
        this.cargando =false;
      });
      return;
    }, 500);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar',
      text: `Está seguro de que desea borrar al medico: "${medico.nombre}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ms.eliminarMedico(medico._id!).subscribe({
          next: (resp) => {
            this.cargarMedicos();
            Swal.fire(
              'Borrado',
              `El medico "${medico.nombre}" ha sido borrado`,
              'success'
            )
          },
          error: () => {
            Swal.fire(
              'Error',
              'El usuario no ha podido ser borrado',
              "error"
            )
          }
        });

      }
    });
  }
}
