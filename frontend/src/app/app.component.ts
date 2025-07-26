import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  autenticado: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.auth.estaAutenticado().subscribe((estado) => {
      this.autenticado = estado;
    });
  }

  logout(): void {
    this.auth.cerrarSesion();
  }
}
