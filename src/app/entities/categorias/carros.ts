import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';
import { Categorias } from './categorias';
import { Modelos } from './modelos';

export class Carros {
  id: number;
  placa: string;
  modelo: Modelos;
  anoModelo: Number;
  valorHora: Number;
  combustivel: Number;
  limitePortaMalas: Number;
  categoria: Number;

  constructor() {}
}
