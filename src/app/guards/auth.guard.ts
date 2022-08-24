import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private us: UsuarioService, private router: Router) { }


  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.us.validarToken().pipe(
      tap(estaAutenticado =>{
        if(!estaAutenticado){
          this.router.navigateByUrl("/login");
          // Swal.fire("Sesion","No está autenticado", "warning");
        }
      })
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

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
