import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment.development';

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private user: User | null = null;

  constructor(private http: HttpClient) { }

 

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authAPI}/login`, { username, password })
      .pipe(
        tap(response => {
          this.setAuthToken(response.token);
          this.setUser(response.user);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<User> {
    const body = { username, email, password };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<User>(`${environment.authAPI}/register`, body, { headers });
  }

  private setAuthToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user = null; // Clear current user upon logout
  }

  private setUser(user: User): void {
    this.user = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Store current user in local storage
  }

  getCurrentUser(): User | null {
    if (!this.user) {
      const userString = localStorage.getItem(this.USER_KEY);
      
      if (userString) {
        this.user = JSON.parse(userString);
      }
    }

    return this.user;
  }
}
