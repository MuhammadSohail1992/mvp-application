import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupFormModel } from '../utils/interfaces/notificationsInterface';

@Injectable({
  providedIn: 'root',
})
export class SignupApi {
  private baseUrl = 'https://api.totalindie.com/api/v1/auth';

  constructor(private http: HttpClient) {}

  // 🧩 Signup API call
  signUp(data: SignupFormModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/signUp`, data);
  }
}
