import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = API_URL;

  constructor() {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl.baseUrl}/users/signin`, {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl.baseUrl}/users/signup`, {
      name,
      email,
      password,
    });
  }
}
