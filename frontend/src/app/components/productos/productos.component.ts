// Este componente maneja la lógica de la interfaz de usuario relacionada con los productos.
// Permite agregar productos mediante un formulario y muestra mensajes de confirmación usando Materialize CSS.

// Importaciones necesarias para el componente de productos
import { Component, OnInit } from '@angular/core';            
import { NgForm } from '@angular/forms';                      
import { ProductoService } from '../../services/producto.service'; 
import { Producto } from '../../models/producto';             

// Declaración de la librería externa Materialize CSS para mostrar notificaciones (toasts)
declare const M: any;

@Component({
  selector: 'app-productos',                                
  templateUrl: './productos.component.html',                
  styleUrls: ['./productos.component.css']                  
})
export class ProductosComponent implements OnInit {

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  agregarProductos(form: NgForm) {
    if (form.value._id) {
      this.productoService.updateProducto(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Producto actualizado correctamente' });
        this.obtenerProductos();
      });
    } else {
      this.productoService.createProducto(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'Producto guardado correctamente' });
        this.obtenerProductos();
      });
    }
  }

  resetForm(form: NgForm) {
    if (form) {
      form.reset();
      this.productoService.selectedProducto = new Producto();
    }
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(res => {
      this.productoService.productos = res as Producto[];
    });
  }

  editarProducto(producto: Producto) {
    this.productoService.selectedProducto = { ...producto };
  }

  eliminarProducto(_id?: string) {
  if (!_id) return;

  if (confirm('¿Está seguro de eliminar este registro?')) {
    this.productoService.deleteProducto(_id).subscribe(res => {
      M.toast({ html: 'Eliminado satisfactoriamente' });
      this.obtenerProductos();
    });
  }
}
}