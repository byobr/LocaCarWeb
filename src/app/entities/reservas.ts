import { Carros } from "./categorias/carros";
import { Cliente } from "./categorias/clientes";

export class Reservas{
  id: number;
  carro: Carros;
  cliente: Cliente;
  dataCheckin: Date;
  dataCheckout: Date;
  horas: number;
  precoNoDia: number;
  precoTotal: number;
  dataAluguel: Date;
  origem: string;
}
