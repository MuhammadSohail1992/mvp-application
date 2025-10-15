// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { switchMap, catchError } from 'rxjs/operators';
// import { of, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginApi {
//   private baseUrl = 'https://api.totalindie.com/api/v1/auth';
//   private tokenKey = 'access_token';
//   private loggedIn: BehaviorSubject<boolean>;

//   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
//     this.loggedIn = new BehaviorSubject<boolean>(this.hasToken());
//   }

//   private isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.baseUrl}/signIn`, credentials).pipe(
//       switchMap((res: any) => {
//         console.log('signIn response:', res);

//         if (res?.token && this.isBrowser()) {
//           localStorage.setItem(this.tokenKey, res.token);
//           this.loggedIn.next(true);

//           return this.http
//             .get(`${this.baseUrl}/me`, {
//               headers: { Authorization: `Bearer ${res.token}` },
//             })
//             .pipe(
//               tap((user: any) => {
//                 console.log('Fetched user:', user);
//                 localStorage.setItem('user', JSON.stringify(user));
//               }),
//               catchError((err) => {
//                 console.error('Error fetching /me:', err);
//                 return throwError(() => err);
//               })
//             );
//         }

//         return of(res);
//       }),
//       catchError((err) => {
//         console.error('Error logging in:', err);
//         return throwError(() => err);
//       })
//     );
//   }

//   // login(credentials: { email: string; password: string }): Observable<any> {
//   //   return this.http.post(`${this.baseUrl}/signIn`, credentials).pipe(
//   //     switchMap((res: any) => {
//   //       if (res?.token && this.isBrowser()) {
//   //         localStorage.setItem(this.tokenKey, res.token);
//   //         this.loggedIn.next(true);

//   //         // Chain the /me request and return it to the subscriber
//   //         return this.http
//   //           .get(`${this.baseUrl}/me`, {
//   //             headers: { Authorization: `Bearer ${res.token}` },
//   //           })
//   //           .pipe(
//   //             tap((user: any) => {
//   //               localStorage.setItem('user', JSON.stringify(user));
//   //             })
//   //           );
//   //       }

//   //       return of(res); // fallback if no token
//   //     })
//   //   );
//   // }

//   isLoggedIn(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }

//   getToken(): string | null {
//     return this.isBrowser() ? localStorage.getItem(this.tokenKey) : null;
//   }

//   getUser(): any {
//     if (!this.isBrowser()) return null;
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   }

//   logout(): void {
//     if (this.isBrowser()) {
//       localStorage.removeItem(this.tokenKey);
//     }
//     this.loggedIn.next(false);
//   }

//   private hasToken(): boolean {
//     if (!this.isBrowser()) return false;
//     return !!localStorage.getItem(this.tokenKey);
//   }

//   getCurrentUser(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/me`, {
//       headers: { Authorization: `Bearer ${this.getToken()}` },
//     });
//   }
// }
import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginApi {
  private baseUrl = 'https://api.totalindie.com/api/v1/auth';
  private tokenKey = 'access_token';
  private loggedIn: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signIn`, credentials).pipe(
      switchMap((res: any) => {
        console.log('SignIn response:', res);

        if (res?.token && this.isBrowser()) {
          localStorage.setItem(this.tokenKey, res.token);
          this.loggedIn.next(true);

          const headers = new HttpHeaders({
            Authorization: `Bearer ${res.token}`,
          });

          // ✅ Run inside the browser zone to ensure access to localStorage
          return new Observable((observer) => {
            this.zone.run(() => {
              this.http
                .get(`${this.baseUrl}/me`, { headers })
                .pipe(
                  tap((user: any) => {
                    console.log('Fetched user:', user);
                    localStorage.setItem(
                      'user',
                      JSON.stringify(user?.data || user)
                    );
                  }),
                  catchError((err) => {
                    console.error('Error fetching /me:', err);
                    return of(null);
                  })
                )
                .subscribe({
                  next: (user) => {
                    observer.next({ token: res.token, user });
                    observer.complete();
                  },
                  error: (err) => observer.error(err),
                });
            });
          });
        }

        return of(res);
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return of(null);
      })
    );
  }

  getUser(): any {
    if (!this.isBrowser()) return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.tokenKey) : null;
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
