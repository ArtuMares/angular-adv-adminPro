import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';


import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario?: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "1052704009353-blvpcdqrar948gh0s1f9kkanh5ur94o6.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  }
  handleCredentialResponse(response: any) {
    console.log(response.credential);
    this.loginGoogle(response.credential).subscribe(resp => {
      this.ngZone.run(() => {
        // console.log({login: resp});
        this.router.navigateByUrl("/dashboard");

      })
    });
  }

  async logout() {
    localStorage.removeItem("token");
    if (this.usuario?.google) {
      await google.accounts.id.revoke(this.usuario.email, () => {
        //google.accounts.id.disableAutoSelect();
      });
    }
    this.ngZone.run(() => {
      this.router.navigateByUrl("/login");
    })
  }

  get token(){
    return localStorage.getItem("token") || "";
  }

  get uid(){
    return this.usuario?.uid || "";
  }
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": this.token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, email, role, google, img = "", uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, "", img, google, role, uid);
        localStorage.setItem("token", resp.token);
        return true;
      })
      , catchError(err => {
        console.log(err);
        return of(false);
      })
    );
  }

  crearUsuario(formData: RegisterForm): Observable<Object> {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
        })
      );;
  }

  actualizarUsuario(data:{email:string, nombre:string, role:string}){
    data = {
      ...data,
      role: this.usuario!.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,  {
      headers: {
        "x-token": this.token
      }
    });
  }

  login(formData: LoginForm): Observable<Object> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          console.log({ login: resp });
          localStorage.setItem("token", resp.token);
        })
      );
  }
}
