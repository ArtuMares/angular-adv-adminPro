import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RxjsComponent } from './rxjs/rxjs.component';


import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';


const routes: Routes = [
    //Router del modulo de pages
    {
        path: "dashboard",
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "", component: DashboardComponent, data: {title: "Dashboard"} },
          { path: "account-settings", component: AccountSettingsComponent,  data: {title: "Account settings"} },
          { path: "grafica", component: Grafica1Component,  data: {title: "Graficas"} },
          { path: "perfil", component: PerfilComponent,  data: {title: "Perfil de usuario"} },
          { path: "progress", component: ProgressComponent,  data: {title: "Progess Bar"}},
          { path: "promesas", component: PromesasComponent,  data: {title: "Promesas"} },
          { path: "rxjs", component: RxjsComponent,  data: {title: "Rxjs"} },

          //Mantenimientos
          { path: "usuarios", component: UsuariosComponent,  data: {title: "Usuario de aplicación"} },
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
