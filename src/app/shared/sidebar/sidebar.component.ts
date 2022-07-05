import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[]=[];

  constructor(private SS: SidebarService, private us:UsuarioService) { 
    this.menuItems= SS.menu;
  }

  logout(){
    this.us.logout();
  }
}
