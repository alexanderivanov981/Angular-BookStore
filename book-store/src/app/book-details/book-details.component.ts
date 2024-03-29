import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../home/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../home/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get the book ID from route parameters
    this.bookService.getBook(id).subscribe((book: Book) => {
      this.book = book;
    });
  }
}
