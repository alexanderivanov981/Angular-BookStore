import { Component, OnInit } from '@angular/core';
import { Book } from '../home/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../home/book.service';
import { UserService } from '../home/user.service';
import { User } from '../home/user';
import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Book; // TODO causes errors in console

  constructor(private route: ActivatedRoute, private bookService: BookService, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get the book ID from route parameters
    this.bookService.getBook(id).subscribe((book: Book) => {
      this.book = book;
    });
  }

  addToFavorites(bookId: number): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.addToFavorites(user.id, bookId).subscribe(
        () => {
          console.log('Book added to favorites successfully.');
        },
        (error) => {
          console.error('Error adding book to favorites:', error);
        }
      );
    }
  }


  addToCart(bookId: number): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.addToCart(user.id, bookId).subscribe(
        () => {
          console.log('Book added to cart.');
        },
        error => {
          console.error('Failed adding book to cart.');
        }
      )
    }
  }
}
