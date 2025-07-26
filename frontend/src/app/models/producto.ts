export class Producto {
  _id?: string;
  nombre: string;
  precio: number;
  marca: string;

  constructor() {
    this.nombre = '';
    this.precio = 0;
    this.marca = '';
  }
}
