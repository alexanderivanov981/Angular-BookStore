import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: Book[] = [];
  favoritesIconUrl : string = "/assets/images/heart-icon-black.jpg";
  addedToFavoritesIconUrl: string = "/assets/images/heart-icon-red.jpg";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

  constructor(private bookService: BookService,
              private router: Router,
              private userService: UserService, 
              private authService: AuthService) {}

  ngOnInit(): void {
    this.readAllBooks();
  }

  readAllBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  addToFavorites(event: Event, bookId: number): void {
    event.stopPropagation();
    if (!this.authService.isLoggedIn())
    {
      this.router.navigate(["/no-permissions"]);
      return;
    }

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
}
