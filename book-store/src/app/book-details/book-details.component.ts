import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../home/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../home/book.service';
import { UserService } from '../home/user.service';
import { AuthenticationService } from '../home/authentication.service';
import { User } from '../home/user';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Book; // TODO causes errors in console

  constructor(private route: ActivatedRoute, private bookService: BookService, private userService: UserService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get the book ID from route parameters
    this.bookService.getBook(id).subscribe((book: Book) => {
      this.book = book;
    });
  }

  addToFavorites(bookId: number): void {
    this.userService.addToFavorites(this.authService.currentUserId, bookId).subscribe(
      () => {
        console.log('Book added to favorites successfully.');
      },
      (error) => {
        console.error('Error adding book to favorites:', error);
      }
    );
  }
}
