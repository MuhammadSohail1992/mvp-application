import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://api.totalindie.com/api/v1/auth';
  private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());

  constructor(private http: HttpClient) {}

  /** 🔹 Get current user as observable (auto updates across components) */
  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  /** 🔹 Get current user snapshot */
  get currentUser(): any {
    return this.userSubject.value;
  }

  /** 🔹 Update user profile, then refetch latest data and sync everything */
  updateProfile(updatedData: any): Observable<any> {
    const token = this.getToken();
    if (!token) throw new Error('No access token found.');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.put(`${this.apiUrl}/profile`, updatedData, { headers }).pipe(
      switchMap(() => this.fetchCurrentUser()), // After update, refresh data
      tap((freshUser) => this.setUserToStorage(freshUser)) // Sync to localStorage
    );
  }

  /** 🔹 Fetch latest user info from backend */
  fetchCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (!token) throw new Error('No access token found.');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    return this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
      tap((user: any) => {
        this.setUserToStorage(user);
      })
    );
  }

  /** 🔹 Get token from localStorage (plain string) */
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /** 🔹 Read user from localStorage (separate key used by login service) */
  private getUserFromStorage(): any {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;

      let parsed = JSON.parse(userStr);
      if (typeof parsed === 'string') parsed = JSON.parse(parsed);

      return parsed;
    } catch {
      return null;
    }
  }

  /** 🔹 Save user to localStorage and emit to all subscribers */
  private setUserToStorage(user: any): void {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    } catch (e) {
      console.error('Failed to save user:', e);
    }
  }
}
