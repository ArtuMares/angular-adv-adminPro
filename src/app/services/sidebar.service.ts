import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu = [];
//   menu:any[] = [{
//     title: "Dashboard",
//     icon: "mdi mdi-gauge",
//     submenu: [
//       {title: "Dashboard", url: "/"},
//       {title: "ProgressBar", url: "progress"},
//       {title: "Gráficas", url: "grafica"},
//       {title: "Promesas", url: "promesas"},
//       {title: "Rxjs", url: "rxjs"},
//     ]
//   },{
//     title: "Mantenimientos",
//     icon: "mdi mdi-folder-lock-open",
//     submenu: [
//       {title: "Usuarios", url: "usuarios"},
//       {title: "Hospitales", url: "hospitales"},
//       {title: "Medicos", url: "medicos"},
//     ]
//   }
// ];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem("menu")!) || [] ;
  };
}
