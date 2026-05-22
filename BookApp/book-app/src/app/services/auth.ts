import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post<{ message: string }>(this.apiUrl + '/register', { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(this.apiUrl + '/login', { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
