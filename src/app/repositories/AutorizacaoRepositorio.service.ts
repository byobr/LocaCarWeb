import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/entities/categorias/clientes';
import { Login } from '@app/entities/categorias/logar';
import { SaidaAPI } from '@app/entities/categorias/saidaapi';
import { Simulacao } from '@app/entities/categorias/simulacao';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AutorizacaoRepositorioService {
  saida: SaidaAPI = new SaidaAPI();

  URL_AUTH_API: string;

  constructor(private http: HttpClient) {
    this.URL_AUTH_API = environment.apiLocaCar + 'Auth/';
  }

  async CadastrarCliente(cliente: Cliente): Promise<SaidaAPI> {
    await this.http
      .post(this.URL_AUTH_API + "Clientes/", cliente)
      .toPromise()
      .then((data) => {
        this.saida.Data = data['data'];
        this.saida.ExecutadoComSucesso = data['executadoComSucesso'];
      })
      .catch((data) => {
        this.saida.Data = null;
        this.saida.ExecutadoComSucesso = false;
        this.saida.Mensagem = data['error']['mensagem'];
      });

    return this.saida;
  }

  async Logar(usuario: string, senha:string): Promise<SaidaAPI> {
    let dados = new Login();
    dados.login = usuario;
    dados.senha = senha;
    dados.operador = false;
    await this.http
      .post(this.URL_AUTH_API, dados)
      .toPromise()
      .then((data) => {
        this.saida.Data = data['data'];
        this.saida.ExecutadoComSucesso = data['executadoComSucesso'];
      })
      .catch((data) => {
        this.saida.Data = null;
        this.saida.ExecutadoComSucesso = false;
        this.saida.Mensagem = data['error']['mensagem'];
      });

    return this.saida;
  }
}
