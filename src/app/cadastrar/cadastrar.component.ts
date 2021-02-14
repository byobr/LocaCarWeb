import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cliente } from '@app/entities/categorias/clientes';
import { SaidaAPI } from '@app/entities/categorias/saidaapi';
import { TokenLC } from '@app/entities/categorias/token';
import { AutorizacaoRepositorioService } from '@app/repositories/AutorizacaoRepositorio.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent implements OnInit {
  cliente: Cliente = new Cliente();
  saida: SaidaAPI = new SaidaAPI();
  token: TokenLC;

  usuario: string;
  senha: string;

  constructor(private clienteRepositorio: AutorizacaoRepositorioService, private alertas: MatSnackBar,
    private nav: Router) {}

  ngOnInit() {}

  async cadastrarCliente() {

    if (
      this.cliente.Celular != null ||
      this.cliente.Cpf != null ||
      this.cliente.Email != null ||
      this.cliente.Senha != null ||
      this.cliente.Nome != null ||
      this.cliente.Aniversaio != null
    ) {
      this.saida = await this.clienteRepositorio.CadastrarCliente(this.cliente);

      if (!this.saida.ExecutadoComSucesso) {
        this.alertas.open(this.saida.Mensagem, 'OK', { duration: 10000 });
      } else {
        this.alertas.open('Cadastrado com sucesso!', 'OK', { duration: 10000 });
      }

    } else {
      this.alertas.open('Favor preencher os campos requeridos!', 'OK', { duration: 10000 });
    }
  }

  async logar(usuario: string, senha: string) {

    if (
      usuario != null ||
      senha != null) {
      this.saida = await this.clienteRepositorio.Logar(usuario, senha);

      if (!this.saida.ExecutadoComSucesso) {
        this.alertas.open(this.saida.Mensagem, 'OK', { duration: 10000 });
      } else {
        this.alertas.open('Logado com sucesso!', 'OK', { duration: 10000 });
        this.token = this.saida["Data"] as TokenLC;
        localStorage.setItem("usuario", JSON.stringify(this.token));
        setTimeout(() => {
          this.nav.navigate(["/"]);
          setTimeout(() => {
            location.reload();
          }, 250);
        }, 2500);
      }

    } else {
      this.alertas.open('Favor preencher os campos de usuário e senha', 'OK', { duration: 10000 });
    }
  }
}
