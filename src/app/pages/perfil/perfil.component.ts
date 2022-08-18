import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm?: UntypedFormGroup;
  public usuario?: Usuario;
  public imagenSubir?: File;
  public imgTemp?: any;

  constructor(private fb: UntypedFormBuilder, private us: UsuarioService, private fu: FileUploadService) {
    this.usuario = us.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]]
    });
  }


  actualizarPerfil() {
    console.log(this.perfilForm);
    this.us.actualizarUsuario(this.perfilForm?.value).subscribe({
      next: () => {
        const { nombre, email } = this.perfilForm?.value;
        this.usuario!.nombre = nombre;
        this.usuario!.email = email;
        Swal.fire("Guardado", "Los cambios fueron guardados exitosamente", "success");
      },
      error: (err) => {
        Swal.fire("Error", err.error.msg, "error");
      }
    });
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
    this.fu.actualizarFoto(this.imagenSubir!, "usuarios", this.usuario?.uid!)
      .then(img => {
        this.usuario!.img = img;
        Swal.fire("Guardado", "La imagen de perfil fue actualizada exitosamente", "success");
      }).catch( err=>{
        console.log(err);
         Swal.fire("Error", "No se pudo subir la imagen", "error");
      });
  }
}
