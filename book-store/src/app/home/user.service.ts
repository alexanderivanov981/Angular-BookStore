import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment.development';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.getUser(username);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${environment.usersAPI}/${username}`);
  }

  updateUser(user: User) {
    this.http.put<User>(`${environment.usersAPI}/${user.id}`, JSON.stringify(user));
  }

  addToFavorites(userId: number, bookId: number): Observable<User> {
    return this.http.post<User>(`${environment.usersAPI}/${userId}/favorite-books`, bookId);
  }

  removeFromFavorites(userId: number, bookId: number): Observable<User> {
    return this.http.delete<User>(`${environment.usersAPI}/${userId}/favorite-books/${bookId}`);
  }

  getFavoriteBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/appusers/${userId}/favorite-books`);
  }

  addToCart(userId: number, bookId: number): Observable<User> {
    return this.http.post<User>(`${environment.usersAPI}/${userId}/cart`, { bookId });
  }

  removeFromCart(userId: number, bookId: number): Observable<User> {
    return this.http.delete<User>(`${environment.usersAPI}/${userId}/cart/${bookId}`);
  }

  getCartBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.usersAPI}/${userId}/cart`)
  }

  deleteUser(userId: number, password: string): Observable<User> {
    return this.http.delete<User>(`${environment.usersAPI}/${userId}`, { body: { password } });
  }
}
