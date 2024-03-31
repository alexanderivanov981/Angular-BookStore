import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
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
    return this.http.get<User>(`${environment.usersAPI}/username/${username}`);
  }

  updateUser(user: User) {
    this.http.put<User>(`${environment.usersAPI}/${user.id}`, JSON.stringify(user));
  }

  getFavoriteBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/appusers/${userId}/favorite-books`);
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${environment.usersAPI}/${userId}`);
  }

  addToFavorites(userId: number, bookId: number): Observable<User> {
    debugger;
    return this.http.post<User>(`${environment.usersAPI}/${userId}/favorite-books`, bookId);
  }

}
