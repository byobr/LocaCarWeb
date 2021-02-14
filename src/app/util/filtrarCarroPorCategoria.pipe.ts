import { Pipe, PipeTransform } from '@angular/core';
import { Carros } from '@app/entities/categorias/carros';

@Pipe({
  name: 'filtrarCarroPorCategoria',
})
export class FiltrarCarroPorCategoria implements PipeTransform {
  transform(items: Carros[], value: number): any[] {
    if (!items) return [];
    if (!value || items.length == 0) return items;
    return items.filter((c) => c.categoria == value);
  }
}
