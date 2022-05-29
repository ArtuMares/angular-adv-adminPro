import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:["./progress.component.css"]
})
export class ProgressComponent {
  
  progresoa:number= 25;
  progresob:number= 25;

  get progreso1(){
    return `${this.progresoa}%`
  }
  get progreso2(){
    return `${this.progresob}%`
  }
  constructor() { }

}
