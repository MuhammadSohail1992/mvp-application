import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { LoginApi } from '../../services/login-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabel, InputText, Password, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private auth: LoginApi, private router: Router) {}

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/discover']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    });
  }
}
