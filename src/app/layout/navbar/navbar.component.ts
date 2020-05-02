import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn;
  }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl('/login');
  }
}
