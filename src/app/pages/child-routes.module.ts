import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PagesRoutingModule } from './pages-routing.module';

const childRoutes:Routes = [
  
  { path: "", component: DashboardComponent, data: { title: "Dashboard" } },
  { path: "account-settings", component: AccountSettingsComponent, data: { title: "Account settings" } },
  { path: "buscar/:termino", component: BusquedasComponent, data: { title: "Busqueda" } },
  { path: "buscar", redirectTo: "" },
  { path: "grafica", component: Grafica1Component, data: { title: "Graficas" } },
  { path: "perfil", component: PerfilComponent, data: { title: "Perfil de usuario" } },
  { path: "progress", component: ProgressComponent, data: { title: "Progess Bar" } },
  { path: "promesas", component: PromesasComponent, data: { title: "Promesas" } },
  { path: "rxjs", component: RxjsComponent, data: { title: "Rxjs" } },

  //Mantenimientos
  { path: "hospitales", component: HospitalesComponent, data: { title: "Hospitales" } },
  { path: "hospitales/:hospital", component: HospitalesComponent, data: { title: "Hospitales" } },
  { path: "medicos", component: MedicosComponent, data: { title: "Médicos" } },
  { path: "medico/:id", component: MedicoComponent, data: { title: "Actualizar médico" } },

  //rutas protegidas o solo para admin
  { path: "usuarios", canActivate: [AdminGuard], component: UsuariosComponent, data: { title: "Usuarios de aplicación" } },
  { path: "usuarios/:usuario", canActivate: [AdminGuard], component: UsuariosComponent, data: { title: "Usuarios de aplicación" } },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
