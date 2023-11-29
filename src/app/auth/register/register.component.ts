import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ["Arturo Mares", Validators.required],
    email: ["test118@gmail.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,15}')]],
    password2: ["123456", Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordsIguales("password", "password2")
  });

  constructor(private fb: UntypedFormBuilder, private us: UsuarioService, private router:Router) { }

   crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    //* Realizar el posteo de información
    this.us.crearUsuario(this.registerForm.value)
      .subscribe({
        next: (resp) => {//Si todo sale bien
          console.log("Usuario Creado");
          console.log(resp);
           Swal.fire("Bienvenido", "El usuario ha sido creado satisfactoriamente", "success");
           this.router.navigateByUrl("/login");
        },
        error: (err) => {//Si sucede un error
          Swal.fire("Error", err.error.msg, "error");
        }
      });
  }
  
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  aceptaTerminos(): boolean {
    return (!this.registerForm.get("terminos")?.value && this.formSubmitted)
  }
  contrasenasDiferentes() {
    const pass1 = this.registerForm.get("password")?.value;
    const pass2 = this.registerForm.get("password2")?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  contrasenasNoValidas(){
    return 
  }
  //validación de passwords
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formgroup: UntypedFormGroup) => {
      const pass1Control = formgroup.get(pass1Name);
      const pass2Control = formgroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ NoEsIgual: true });
      }
    }

  }
}
