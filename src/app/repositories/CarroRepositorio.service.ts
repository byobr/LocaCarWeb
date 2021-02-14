import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carros } from '@app/entities/categorias/carros';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CarroRepositorioService {
  carros: Carros[] = [];

  URL_CARROS_API: string;

  constructor(private http: HttpClient) {
    this.URL_CARROS_API = environment.apiLocaCar + 'Carros/';
  }

  async ObterTodosCarros(): Promise<Carros[]> {
    let retorno = await this.http.get(this.URL_CARROS_API).toPromise();
    this.carros = retorno['data'];
    return this.carros;
  }

  async ObterTodosCarrosPorCategoria(id: number): Promise<Carros[]> {
    let retorno = await this.http.get(this.URL_CARROS_API).toPromise();
    this.carros = retorno['data'];
    this.carros = this.carros.filter((i) => i.categoria == id);
    return this.carros;
  }
}
