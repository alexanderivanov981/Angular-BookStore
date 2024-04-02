import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/book';
import { ActivatedRoute } from '@angular/router';
import { DBService } from '../../shared/db-service.service';
import { User } from '../../shared/user';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book!: Book; // TODO causes errors in console

  constructor(private route: ActivatedRoute, private dbService: DBService, private authService: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get the book ID from route parameters
    this.dbService.getBook(id).subscribe((book: Book) => {
      this.book = book;
    });
  }

  addToFavorites(bookId: number): void {
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


  addToCart(bookId: number): void {
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
