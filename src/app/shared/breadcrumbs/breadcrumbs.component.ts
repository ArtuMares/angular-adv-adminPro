import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string = "";
  public titulosub$: Subscription | undefined;

  constructor(private Router: Router)  {
    this.titulosub$ = this.getArgumentosRuta().subscribe(({ title }) => {
      this.titulo = title;
      document.title = `AdminPro - ${this.titulo}`
    });;
  }
  ngOnDestroy(): void {
    this.titulosub$?.unsubscribe();
  }

  getArgumentosRuta() {
    return this.Router.events.pipe(
      filter<any>(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    )

  }

}
