import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';


import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

declare const google:any;

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient, private router:Router, private ngZone:NgZone) { }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "1052704009353-blvpcdqrar948gh0s1f9kkanh5ur94o6.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });
  }
  handleCredentialResponse(response:any){
    console.log(response.credential);
    this.loginGoogle(response.credential).subscribe(resp=>{
      this.ngZone.run(()=>{
        // console.log({login: resp});
        this.router.navigateByUrl("/dashboard");

      })
    });
  }

  logout(){
    localStorage.removeItem("token");
    google.accounts.id.revoke("artumares08@gmail.com", () =>{
      google.accounts.id.disableAutoSelect();
      this.ngZone.run(()=>{
        this.router.navigateByUrl("/login");
      })
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem("token")|| "";
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "x-token": token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem("token", resp.token);
      })
      ,map(resp => true)
      ,catchError(err => of(false))
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

  login(formData: LoginForm): Observable<Object> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem("token", resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any) => {
          console.log({login: resp});
          localStorage.setItem("token", resp.token);
        })
      );
  }
}
