import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UsuarioModel;
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.user = new UsuarioModel();
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    console.log(loginForm.value);
    this._authService.login(this.user).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
