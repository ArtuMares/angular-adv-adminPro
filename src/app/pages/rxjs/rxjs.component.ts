import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, map, interval, take, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent  implements OnDestroy{

  public intervalSub: Subscription | undefined;

  constructor() { 
    
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next: (n) => {console.log("subs: ", n)},
    //   error: (e) => {console.log("error: ", e)},
    //   complete: () => {console.log("Obs terminado")}
    // });
    this.intervalSub=   this.retornaIntervalo().subscribe(valor =>{
      console.log(valor)
    })
  }
  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }
  retornaIntervalo(): Observable<number>{
    return  interval(200)
                      .pipe(
                        // take(10),
                        map(valor => {
                          return valor+1;
                        }),
                        filter(valor => (valor % 2 ===0)? true: false)
                        );
  }

  retornaObservable(): Observable<number>{
    let i =-1;
    return new Observable<number>(observer =>{
      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i===2){
          observer.error(i);
        }
      }, 1000)
    });
  }
}
