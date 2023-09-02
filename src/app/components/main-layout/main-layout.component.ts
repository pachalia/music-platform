import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  nav = [
    {name: 'Главная', href: '/'},
    {name: 'Список треков', href: 'tracks'},
    {name: 'Список Альбомов', href: 'albums'}
  ]

  constructor(private breakpointObserver: BreakpointObserver) {}

}
