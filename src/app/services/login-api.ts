import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private baseUrl = 'https://api.totalindie.com/api/v1/auth';
  private tokenKey = 'access_token';
  private loggedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signIn`, credentials).pipe(
      switchMap((res: any) => {
        console.log('SignIn response:', res);
        console.log('Full SignIn response:', JSON.stringify(res, null, 2));

        const token = res?.data?.token || res?.token;
        console.log('Extracted token:', token);

        if (token) {
          this.setToken(token);
          this.loggedIn.next(true);

          const headers = new HttpHeaders({
            Authorization: token,
          });

          return this.http.get(`${this.baseUrl}/me`, { headers }).pipe(
            tap((userData: any) => {
              console.log('Fetched user:', userData);
              this.setUser(userData?.data || userData);
            }),
            switchMap((userData) => {
              return of({ token: token, user: userData?.data || userData });
            }),
            catchError((err) => {
              console.error('Error fetching /me:', err);
              return of({ token: token, user: null });
            })
          );
        }

        return throwError(() => new Error('No token received'));
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }

  private setToken(token: string): void {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.tokenKey, token);
      } catch (e) {
        console.error('Failed to save token:', e);
      }
    }
  }

  private setUser(user: any): void {
    if (this.isBrowser()) {
      try {
        const userData = typeof user === 'string' ? JSON.parse(user) : user;
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (e) {
        console.error('Failed to save user:', e);
      }
    }
  }

  getUser(): any {
    if (!this.isBrowser()) return null;
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;

      let parsed = JSON.parse(userStr);

      // Handle double-stringified data
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }

      return parsed;
    } catch (e) {
      console.error('Failed to get user:', e);
      return null;
    }
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('user');
    }
    this.loggedIn.next(false);
  }

  private hasToken(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem(this.tokenKey);
  }
}
