import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

    titulo  :string = "Ventas"
    
    doughnutChartLabels1: string[] = ['ventas por correo', 'ventas en tienda', 'Ventas online'];

    doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels1,
    datasets: [
      { data: [100,200,300], backgroundColor: ["#6857E6", "#009FEE", "#F02059"] }
    ],
  };
}
