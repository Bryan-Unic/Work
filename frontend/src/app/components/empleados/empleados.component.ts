// Este componente maneja la lógica de la interfaz de usuario relacionada con los empleados.
// Permite agregar empleados mediante un formulario y muestra mensajes de confirmación usando Materialize CSS.

// Importaciones necesarias para el componente de empleados
import { Component, OnInit } from '@angular/core';            // Decorador y ciclo de vida para componentes Angular
import { NgForm } from '@angular/forms';                      // Permite trabajar con formularios template-driven
import { EmpleadoService } from "../../services/empleado.service"; // Servicio que gestiona las operaciones sobre empleados
import { Empleado } from '../../models/empleado';             // Modelo de datos de empleado

// Declaración de la librería externa Materialize CSS para mostrar notificaciones (toasts)
declare const M: any;

// Decorador que define los metadatos del componente
@Component({
  selector: 'app-empleados',                                // Selector para usar este componente en otras vistas
  templateUrl: './empleados.component.html',                // Ruta del archivo de plantilla HTML asociado
  styleUrls: ['./empleados.component.css']                  // Ruta del archivo de estilos CSS del componente
})
export class EmpleadosComponent implements OnInit {

  // Inyección del servicio de empleados como propiedad pública para que se pueda usar en la plantilla HTML
  constructor(public empleadoService: EmpleadoService) {}

  // Método del ciclo de vida que se ejecuta cuando se inicializa el componente
  // Se usa para cargar la lista inicial de empleados desde el backend
  ngOnInit(): void {
    this.obtenerEmpleados();
  }
agregarEmpleado(form: NgForm) {
  if (form.value._id) {
    // Si hay un _id, actualiza el empleado
    this.empleadoService.putEmpleado(form.value).subscribe(res => {
      this.resetForm(form); // Limpia el formulario
      M.toast({ html: 'Actualizado satisfactoriamente' }); // Muestra notificación
      this.obtenerEmpleados(); // Recarga la lista de empleados
    });
  } else {
    // Si no hay _id, crea un nuevo empleado
    this.empleadoService.postEmpleado(form.value).subscribe(res => {
      this.resetForm(form); // Limpia el formulario
      M.toast({ html: 'Guardado satisfactoriamente' }); // Muestra notificación
      this.obtenerEmpleados(); // Recarga la lista de empleados
    });
  }
}

resetForm(form: NgForm) {
  if (form) {
    form.reset(); // Limpia todos los campos del formulario
    this.empleadoService.selectedEmpleado = new Empleado(); // Reinicia el empleado seleccionado
  }
}
obtenerEmpleados() {
  this.empleadoService.getEmpleados().subscribe(res => {
    this.empleadoService.empleados = res as Empleado[];
  });
}

editarEmpleado(empleado: Empleado) {
  this.empleadoService.selectedEmpleado = { ...empleado };
}

eliminarEmpleado(_id: string) {
  if (confirm('¿Está seguro de eliminar este registro?')) {
    this.empleadoService.deleteEmpleado(_id).subscribe(res => {
      M.toast({ html: 'Eliminado satisfactoriamente' });
      this.obtenerEmpleados();
    });
  }
}}