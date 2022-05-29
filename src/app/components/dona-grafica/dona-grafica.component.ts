import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona-grafica',
  templateUrl: './dona-grafica.component.html',
  styles: [
  ]
})
export class DonaGraficaComponent  {

  //* Inputs de info de las gráficas
  @Input("title") titulo: string = "Sin nombre";
  @Input("labels") doughnutChartLabels1: string[] = ['data1', 'data2', 'data3'];
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels1,
    datasets: [
      { data: [1,2,3], backgroundColor: ["#6857E6", "#009FEE", "#F02059"] }
    ],
  };
  constructor(){

  }
}
