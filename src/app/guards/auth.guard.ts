import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private us: UsuarioService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.us.validarToken().pipe(
      tap(estaAutenticado =>{
        if(!estaAutenticado){
          this.router.navigateByUrl("/login");
          // Swal.fire("Sesion","No está autenticado", "warning");
        }
      })
    )
  }

}
