import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBookHTML(): Observable<string> {
    return this.http.get<any>('http://localhost:8080/books').pipe(
      map((bookData: any) => {
        return this.generateHTML(bookData);
      })
    );
  }

  private generateHTML(bookData: any): string {
    let html = '<div class="book-details">';
    html += '<h2>' + bookData.title + '</h2>';
    html += '<p>Author: ' + bookData.author + '</p>';
    html += '<p>Genre: ' + bookData.genre + '</p>';
    html += '<p>Published: ' + bookData.published + '</p>';
    // Add more details as needed
    html += '</div>';
    return html;
  }
}
