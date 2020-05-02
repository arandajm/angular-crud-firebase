import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  private apiKey: string;

  constructor(private http: HttpClient) {
    // Get apiKey and firabaseUrl from environment variables
    this.apiKey = environment.apiKey;
    this.url = environment.firebaseUrl;
  }

  login(user: UsuarioModel) {
    const payload = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };
    return this.http.post(this.getUrl('accounts:signInWithPassword'), payload);
  }

  register(user: UsuarioModel) {}

  logout() {}

  getUrl(query: string) {
    return `${this.url}${query}?key=${this.apiKey}`;
  }

  isAuthenticated() {
    return true;
  }
}
