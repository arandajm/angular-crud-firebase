import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  private apiKey: string;
  private token: string;
  // Use Subject to check if the user is loggedIn
  private loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    // Get apiKey and firabaseUrl from environment variables
    this.apiKey = environment.apiKey;
    this.url = environment.firebaseUrl;
    this.token = this.getToken();
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  get isLoggedIn() {
    this.isAuthenticated();
    return this.loggedIn.asObservable();
  }

  login(user: UsuarioModel) {
    const payload = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    };
    return this.http
      .post(this.getUrl('accounts:signInWithPassword'), payload)
      .pipe(
        map((resp) => {
          // Set token
          this.setToken(resp['idToken']);
          // Set Token Expiration
          this.setTokenExpiration(resp['expiresIn']);
          // return resp to continue the chain
          return resp;
        })
      );
  }

  register(user: UsuarioModel) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.loggedIn.next(false);
  }

  getUrl(query: string) {
    return `${this.url}${query}?key=${this.apiKey}`;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  setTokenExpiration(expirationTime: string) {
    let today = new Date();
    today.setSeconds(Number(expirationTime));
    localStorage.setItem('expiresIn', today.getTime().toString());
  }

  isAuthenticated() {
    if (this.token.length < 2) {
      this.loggedIn.next(false);
    }

    const expira = Number(localStorage.getItem('expiresIn'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    return expiraDate > new Date()
      ? this.loggedIn.next(true)
      : this.loggedIn.next(false);
  }
}
