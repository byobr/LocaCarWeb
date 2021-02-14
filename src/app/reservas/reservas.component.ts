import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenLC } from '@app/entities/categorias/token';
import { Reservas } from '@app/entities/reservas';
import { AlugueisRepositorioService } from '@app/repositories/AlugueisRepositorio.service';
import { CarroRepositorioService } from '@app/repositories/CarroRepositorio.service';
import { Categorias } from '../entities/categorias/categorias';
import { CategoriasRepositorioService } from '../repositories/CategoriasRepositorio.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {

  token: TokenLC;

  reservas: Reservas[] = [];

  categorias: Categorias[];

  constructor(
    categoriaRepositorio: CategoriasRepositorioService,
    private alugueisRepositorio: AlugueisRepositorioService,
    private nav: Router) {
    this.categorias = categoriaRepositorio.ObterCategorias();
  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('usuario'));
    if(this.token == null){
      this.nav.navigate(["/home"]);
    }
    this.alugueisRepositorio.Reservas(this.token.idUsuario, this.token.token).then((dados) => {
      this.reservas = dados["Data"] as Reservas[];
      this.reservas = this.reservas.sort((a, b) => (a.dataAluguel > b.dataAluguel ? -1 : 1));
      console.log(dados);
    });
  }
}
