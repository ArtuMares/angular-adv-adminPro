import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild("googleBtn") googleBtn!:ElementRef;

  public loginForm = this.fb.group({
    email: [localStorage.getItem("email") || "", [Validators.required, Validators.email]],
    password: ["123456", Validators.required],
    remember: [false]
  });

  constructor(private Router:Router, private fb: FormBuilder, private us: UsuarioService) { }


  ngAfterViewInit(): void {
    this.googleInit();
  } 

  googleInit(){
    this.us.googleInit(); //del servicio
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "filled_blue", size: "large", shape: "pill" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }
 

  login(){
    this.us.login(this.loginForm.value).subscribe({ //Si todo sale bien
      next: (resp) =>{
        console.log(resp)
        if(this.loginForm.get("remember")?.value){
          localStorage.setItem("email", this.loginForm.get("email")?.value)
        }else{
          localStorage.removeItem("email");
        }
        this.Router.navigateByUrl("/dashboard");
      },
      error: (err) =>{//Si hay un error
        Swal.fire("Error", err.error.msg, "error");
      }
    });
  }
}
