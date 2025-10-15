import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { LoginApi } from '../../services/login-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabel, InputText, Password],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private auth: LoginApi, private router: Router) {}

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.router.navigate(['/discover']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      },
    });
  }

  // onSignIn() {
  //   console.log('Sign in with:', this.email, this.password);
  //   // Add your authentication logic here
  // }
}
