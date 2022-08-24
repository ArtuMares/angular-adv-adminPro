import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RxjsComponent } from './rxjs/rxjs.component';


import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';




const routes: Routes = [
  //Router del modulo de pages
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import("./child-routes.module").then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
