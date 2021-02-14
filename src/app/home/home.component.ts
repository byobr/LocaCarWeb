import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Alugueis } from '@app/entities/categorias/alugueis';
import { Carros } from '@app/entities/categorias/carros';
import { SaidaAPI } from '@app/entities/categorias/saidaapi';
import { Simulacao } from '@app/entities/categorias/simulacao';
import { TokenLC } from '@app/entities/categorias/token';
import { AlugueisRepositorioService } from '@app/repositories/AlugueisRepositorio.service';
import { CarroRepositorioService } from '@app/repositories/CarroRepositorio.service';
import { Categorias } from '../entities/categorias/categorias';
import { CategoriasRepositorioService } from '../repositories/CategoriasRepositorio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  DataIn: Date;
  DataOut: Date;
  CategoriaSelecionada: number = 0;
  CarroSelecionado: number = 0;
  listaCarros: Carros[] = [];
  aluguel: Alugueis = new Alugueis();
  saida: SaidaAPI = new SaidaAPI();
  mostrarSimulacao: boolean = false;
  simulacao: Simulacao;
  token: TokenLC;

  categorias: Categorias[];

  constructor(
    private categoriaRepositorio: CategoriasRepositorioService,
    private carrosRepositorio: CarroRepositorioService,
    private alugueisRepositorio: AlugueisRepositorioService,
    private alertas: MatSnackBar,
    private nav: Router
  ) {
    this.categorias = categoriaRepositorio.ObterCategorias();
  }

  ngOnInit() {
    this.carrosRepositorio.ObterTodosCarros().then((dados) => {
      this.listaCarros = dados;
    });
  }

  async simularLocacao() {
    this.aluguel.carroId = this.CarroSelecionado;
    this.aluguel.dataAluguel = new Date();
    this.aluguel.dataCheckin = this.DataIn;
    this.aluguel.dataCheckout = this.DataOut;
    this.aluguel.origem = 'WEB';

    this.saida = await this.alugueisRepositorio.SimularAluguel(this.aluguel);

    if (!this.saida.ExecutadoComSucesso) {
      this.alertas.open(this.saida.Mensagem, 'OK', { duration: 10000 });
    } else {
      this.mostrarSimulacao = true;
      this.simulacao = this.saida.Data as Simulacao;
    }
  }

  async alugar() {
    this.token = JSON.parse(localStorage.getItem('usuario'));
    if (this.token != null) {
      this.aluguel.carroId = this.CarroSelecionado;
      this.aluguel.dataAluguel = new Date();
      this.aluguel.dataCheckin = this.DataIn;
      this.aluguel.dataCheckout = this.DataOut;
      this.aluguel.clienteId = this.token.idUsuario;
      this.aluguel.origem = 'WEB';

      this.saida = await this.alugueisRepositorio.Reservar(this.aluguel, this.token.token);

      if (!this.saida.ExecutadoComSucesso) {
        this.alertas.open(this.saida.Mensagem, 'Ok!', { duration: 10000 });
      } else {
        this.alertas.open("Reservado com sucesso!", 'Ok', { duration: 10000 });
        setTimeout(() => {
          this.nav.navigate(["/reservas"])
        }, 3000);
      }
    } else {
      this.alertas.open('Necessário estar logado, redirecionando para tela de login...', 'Ok', { duration: 10000 });
      this.nav.navigate(['/cadastrar']);
    }
  }
}
