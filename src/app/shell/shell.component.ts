import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@core';
import { TokenLC } from '@app/entities/categorias/token';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  logado: boolean = false;
  usuario: string;
  token: TokenLC;

  constructor(private media: MediaObserver, private nav: Router) {}

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) =>
          changes.some((change) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm')
        ),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());

    this.token = JSON.parse(localStorage.getItem('usuario'));
    if (this.token != null) {
      this.logado = true;
      this.usuario = this.token.usuario;
    }
  }

  deslogar() {
    localStorage.setItem('usuario', null);
    setTimeout(() => {
      this.nav.navigate(['/home']);
      setTimeout(() => {
        location.reload();
      }, 100);
    }, 300);
  }
}
