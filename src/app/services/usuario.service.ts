import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';


import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

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


  get token(){
    return localStorage.getItem("token") || "";
  }

  get uid(){
    return this.usuario?.uid || "";
  }

  get role(): "USER_ROLE" | "ADMIN_ROLE"{
    return this.usuario?.role!;
  }

  get headers(){
    return {
      headers: {
        "x-token": this.token
      }
    }
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
        this.guardarLocalStorage(resp.token, resp.menu);
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
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );;
  }

  actualizarUsuario(data:{email:string, nombre:string, role:string}){
    data= {
      ...data,
      role: this.usuario?.role!
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  guardarUsuario(usuario:Usuario){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

  eliminarUsuario(usuario:Usuario){
    //http://localhost:3000/api/usuarios/629fcaa19f91cf9702198c1d
    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);
  }

  login(formData: LoginForm): Observable<Object> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          console.log({ login: resp });
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  cargarUsuarios(desde:number = 0){
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(map(resp =>{
          const usuarios= resp.usuarios.map(usr => new Usuario(usr.nombre, usr.email, "",  usr.img, usr.google, usr.role, usr.uid ))
        return {
          total: resp.total,
          usuarios
        };
      }))
  }

  guardarLocalStorage(token:string, menu:any){
        localStorage.setItem("token", token);
        localStorage.setItem("menu", JSON.stringify(menu));
  }

  async logout() { 
    localStorage.removeItem("menu")
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
}
