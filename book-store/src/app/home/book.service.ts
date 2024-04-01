import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }


  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.booksAPI}/${id}`)
  }


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.booksAPI}`);
  }
  
}
