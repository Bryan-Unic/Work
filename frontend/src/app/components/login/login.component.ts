import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.auth.login(this.usuario).subscribe({
      next: (res) => {
        this.auth.guardarToken(res.token);
        this.router.navigate(['/inicio']);
      },
      error: () => {
        alert('Credenciales inválidas');
      }
    });
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }
}
