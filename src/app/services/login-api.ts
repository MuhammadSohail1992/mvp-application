import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private baseUrl = 'https://api.totalindie.com/api/v1/auth';
  private tokenKey = 'access_token';
  private userKey = 'user';

  /** ✅ Global BehaviorSubjects */
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());
  private loggedIn = new BehaviorSubject<boolean>(!!this.getTokenFromStorage());

  /** ✅ Public Observables */
  user$ = this.userSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    console.log('🔑 Loaded token from storage:', this.getTokenFromStorage());
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** 🔹 Login and store token/user globally */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signIn`, credentials).pipe(
      switchMap((res: any) => {
        const token = res?.data?.token || res?.token;
        if (!token) return throwError(() => new Error('No token received'));

        this.setToken(token);

        const headers = new HttpHeaders({
          Authorization: token, // ✅ API expects token without "Bearer"
        });

        return this.http.get(`${this.baseUrl}/me`, { headers }).pipe(
          tap((userData: any) => {
            const user = userData?.data || userData;
            this.setUser(user);
          }),
          switchMap((userData) => of({ token, user: userData?.data || userData })),
          catchError((err) => {
            console.error('Error fetching /me:', err);
            return of({ token, user: null });
          })
        );
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => err);
      })
    );
  }

  /** 🔹 Save token and emit globally */
  private setToken(token: string): void {
    if (this.isBrowser() && token) {
      try {
        localStorage.setItem(this.tokenKey, token);
      } catch (e) {
        console.error('Failed to save token:', e);
      }
    }
    this.tokenSubject.next(token);
    this.loggedIn.next(true);
  }

  /** 🔹 Save user and emit globally */
  private setUser(user: any): void {
    if (this.isBrowser() && user) {
      try {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } catch (e) {
        console.error('Failed to save user:', e);
      }
    }
    this.userSubject.next(user);
  }

  /** 🔹 Get snapshots */
  get currentUser(): any {
    return this.userSubject.value;
  }

  get currentToken(): string | null {
    return this.tokenSubject.value;
  }

  /** 🔹 Logout and clear all */
  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    this.loggedIn.next(false);
  }

  /** 🔹 LocalStorage helpers */
  private getUserFromStorage(): any {
    if (!this.isBrowser()) return null;
    const str = localStorage.getItem(this.userKey);
    try {
      return str ? JSON.parse(str) : null;
    } catch {
      return null;
    }
  }

  private getTokenFromStorage(): string | null {
    try {
      if (!this.isBrowser()) return null;
      const token = localStorage.getItem(this.tokenKey);
      // ✅ prevent 'undefined' or 'null' strings
      return token && token !== 'undefined' && token !== 'null' ? token : null;
    } catch {
      return null;
    }
  }

  /** 🔹 Update user everywhere */
  updateUserProfile(newUser: any): void {
    const updated = { ...(newUser?.data || newUser) };

    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.userKey, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update user:', e);
      }
    }

    this.userSubject.next({ ...updated });
  }

  /** 🔹 Restore user from token on app reload */
  restoreSession(): void {
    const token = this.getTokenFromStorage();

    if (!token || !this.isBrowser()) return;

    // ✅ Skip if user already loaded
    if (this.userSubject.value) return;

    const headers = new HttpHeaders({ Authorization: token });

    this.http.get(`${this.baseUrl}/me`, { headers }).subscribe({
      next: (user: any) => {
        const userData = user?.data || user;
        this.updateUserProfile(userData);
        this.loggedIn.next(true);
        console.log('🔁 Session restored from token:', userData);
      },
      error: (err) => {
        console.warn('Session restore failed:', err);
        this.logout(); // optional: clear invalid token
      },
    });
  }
}