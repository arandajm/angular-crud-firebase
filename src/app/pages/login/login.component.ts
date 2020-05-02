import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UsuarioModel;
  constructor() {}

  ngOnInit(): void {
    this.user = new UsuarioModel();
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    console.log(loginForm.value);
  }
}
