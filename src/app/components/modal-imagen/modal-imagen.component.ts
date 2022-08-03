import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  // public ocultarModal:boolean = false;
  public imagenSubir?: File;
  public imgTemp?: any;

  constructor(public mi:ModalImagenService, public fu:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.mi.cerrarModal();
  }

  cambiarImagen(target: any) {
    this.imagenSubir = target.files[0];

    if (!target.files[0]) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return;
  }

  subirImagen() {
    const id= this.mi.id;
    const tipo= this.mi.tipo!;

    this.fu.actualizarFoto(this.imagenSubir!, tipo , id)
      .then(img => {
        Swal.fire("Guardado", `La imagen fue actualizada exitosamente`, "success");
        this.mi.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch( err=>{
        console.log(err);
         Swal.fire("Error", "No se pudo subir la imagen", "error");
      });
  }
}
