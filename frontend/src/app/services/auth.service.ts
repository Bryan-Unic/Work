import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL_API = 'http://localhost:3000/api/auth';

  // Observable del estado de autenticación
  private autenticado = new BehaviorSubject<boolean>(this.tieneToken());

  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.URL_API}/registro`, usuario);
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.URL_API}/login`, usuario);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
    this.autenticado.next(true);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): Observable<boolean> {
    return this.autenticado.asObservable();
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.autenticado.next(false);
  }
  

  private tieneToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
