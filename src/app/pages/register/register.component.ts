import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: UsuarioModel;
  constructor() {}

  ngOnInit(): void {
    this.user = new UsuarioModel();
  }

  register(registerForm) {
    console.log(registerForm);
  }
}
