import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoginApi } from './services/login-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('mvp-application');

  constructor(private auth: LoginApi) {
    // Optional: subscribe if you want to react to user state globally
    this.auth.user$.subscribe((user) => {
      if (user) {
        console.log('User restored:', user);
      }
    });
  }
}
