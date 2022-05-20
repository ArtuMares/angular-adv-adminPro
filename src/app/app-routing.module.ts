import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';

const Routes: Routes = [
  // * Rutas protegidas
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "progress", component: ProgressComponent },
      { path: "grafica", component: Grafica1Component },
      {path: "", redirectTo: "dashboard", pathMatch: "full"}
    ]
  },
  //* rutas no protegidas
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  //* otras 
  { path: "**", component: NoPageFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(Routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
