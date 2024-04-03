import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/book';
import { Router } from '@angular/router';
import { DBService } from '../../shared/db-service.service';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: Book[] = [];
  favoritesIconUrl : string = "assets/images/heart-icon-red.jpg";
  shoppingCartIconUrl: string = "assets/images/cart-add.png ";

  constructor(private router: Router,
              private dbService: DBService, 
              private authService: AuthService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.readAllBooks();
  }

  readAllBooks(): void {
    this.dbService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  addToFavorites(event: MouseEvent, bookId: number): void {
    event.stopPropagation();
    if (!this.authService.isLoggedIn())
    {
      this.router.navigate(["/no-permissions"]);
      return;
    }

    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.addToFavorites(user.id, bookId).subscribe(
        () => {
          this.dbService.openSnackBar('Book added to favorites successfully.', '');
        },
        (error) => {
          console.error(error);
          this.dbService.openSnackBar('Failed adding book to favorites.', '');
        }
      );
    }
  }

  addToCart(event: MouseEvent, bookId: number): void {
    event.stopPropagation();

    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.addToCart(user.id, bookId).subscribe(
        () => {
          this.dbService.openSnackBar('Book added to cart successfully.', '');
        },
        (error) => {
          console.error(error);
          this.dbService.openSnackBar('Failed adding book to cart.', '');
        }
      );
    }
  }

}
