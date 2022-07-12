import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaGraficaComponent } from './dona-grafica/dona-grafica.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';




@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaGraficaComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonaGraficaComponent,
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
