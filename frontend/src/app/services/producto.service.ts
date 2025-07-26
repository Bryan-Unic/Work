import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
readonly URL_API = 'http://localhost:3000/api/productos'; // Ajusta según tu backend
  selectedProducto: Producto = new Producto();
  productos: Producto[] = [];

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL_API);
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.URL_API, producto);
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.URL_API}/${producto._id}`, producto);
  }

  deleteProducto(_id: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
