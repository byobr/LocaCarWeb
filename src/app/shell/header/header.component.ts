import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenLC } from '@app/entities/categorias/token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  logado: boolean = false;
  usuario: string;
  token: TokenLC;

  constructor(private titleService: Title, private nav: Router) {}

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('usuario'));
    if (this.token != null) {
      this.logado = true;
      this.usuario = this.token.usuario;
    }
  }

  get title(): string {
    return this.titleService.getTitle();
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
