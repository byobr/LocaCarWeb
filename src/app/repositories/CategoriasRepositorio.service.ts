import { Injectable } from '@angular/core';
import { Categorias } from '../entities/categorias/categorias';

@Injectable({
  providedIn: 'root',
})
export class CategoriasRepositorioService {
  categorias: Categorias[] = [];

  constructor() {
    this.categorias.push({ id: 1, nome: 'Básico' });
    this.categorias.push({ id: 2, nome: 'Completo' });
    this.categorias.push({ id: 3, nome: 'Luxo' });
  }

  ObterCategorias() {
    return this.categorias;
  }
}
