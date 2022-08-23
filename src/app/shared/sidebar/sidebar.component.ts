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
  
  
  
  constructor(private SS: SidebarService, private us:UsuarioService) { 
    
    this.menuItems= SS.menu;

    this.usuario= us.usuario;

  }

  logout(){
    this.us.logout();
  }
}
