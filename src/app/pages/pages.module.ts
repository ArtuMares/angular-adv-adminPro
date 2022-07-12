import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
  ]
})
export class PagesModule { }
