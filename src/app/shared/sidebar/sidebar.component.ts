import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[]=[];

  public usuario?:Usuario;
  // public imgUrl?:string;
  // public nombre?:string;
  
  
  constructor(private SS: SidebarService, private us:UsuarioService) { 
    this.menuItems= SS.menu;

    this.usuario= us.usuario;
    // this.imgUrl = us.usuario?.imagenUrl;
    // this.nombre= us.usuario?.nombre;
  }

  logout(){
    this.us.logout();
  }
}
