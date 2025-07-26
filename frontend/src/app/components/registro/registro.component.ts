import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
usuario: Usuario = {
  nombre: '',
  email: '',
  password: ''
}; // ✅ objeto literal que cumple con la interfaz

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.registrar(this.usuario).subscribe({
      next: res => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
  }
}
