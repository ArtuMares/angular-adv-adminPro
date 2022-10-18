import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario?: Usuario;
  private timeout: any;

  constructor(private us: UsuarioService, private router: Router) {
    this.usuario = us.usuario;
  }

  logout() {
    this.us.logout();
  }
  
  buscar(termino: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (termino.trim().length < 1) {
        this.router.navigateByUrl(`/dashboard`);
        return;
      }
      this.router.navigateByUrl(`/dashboard/buscar/${termino.trim()}`);
    }, 500);
  }
}
