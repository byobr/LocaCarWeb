import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alugueis } from '@app/entities/categorias/alugueis';
import { Carros } from '@app/entities/categorias/carros';
import { SaidaAPI } from '@app/entities/categorias/saidaapi';
import { Simulacao } from '@app/entities/categorias/simulacao';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AlugueisRepositorioService {
  saida: SaidaAPI = new SaidaAPI();

  URL_ALUGUEIS_API: string;

  constructor(private http: HttpClient) {
    this.URL_ALUGUEIS_API = environment.apiLocaCar + 'Alugueis';
  }

  async SimularAluguel(aluguel: Alugueis): Promise<SaidaAPI> {
    await this.http
      .post(this.URL_ALUGUEIS_API + '/SimularAluguel', aluguel)
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

  async Reservar(aluguel: Alugueis, token: string): Promise<SaidaAPI> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    let options = { headers: headers };

    await this.http
      .post(this.URL_ALUGUEIS_API + '/Cliente', aluguel, options)
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

  async Reservas(idUsuario: number, token: string): Promise<SaidaAPI> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    let options = { headers: headers };

    await this.http
      .get(this.URL_ALUGUEIS_API + '/Cliente?Cliente=' + idUsuario, options)
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
