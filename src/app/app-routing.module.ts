import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
//Módulos de routing
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';


import { NoPageFoundComponent } from './no-page-found/no-page-found.component';



const Routes: Routes = [
  // * Rutas protegidas
  
  //* rutas no protegidas
  
  //* otras 
  { path: "", redirectTo: "dashboard", pathMatch:"full" },
  { path: "**", component: NoPageFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(Routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
