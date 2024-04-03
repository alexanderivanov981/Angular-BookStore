import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Book } from 'src/app/shared/book';
import { User } from 'src/app/shared/user';
import { DBService } from 'src/app/shared/db-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  books: Book[] = [];
  favoritesIconUrl: string = "assets/images/heart-icon-red.jpg";
  shoppingCartIconUrl: string = "assets/images/cart-add.png";

  constructor(
    private dbService: DBService,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchFavoriteBooks();
  }

  fetchFavoriteBooks() {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.getFavoriteBooks(user.id).subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
    }
  }

  removeBookFromFavorites(event: MouseEvent, book: Book): void {
    event.stopPropagation();

    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.removeFromFavorites(user.id, book.id)
      .subscribe(
        () => {
          const index: number = this.books.indexOf(book);
          if (index !== -1) {
              this.books.splice(index, 1);
          } 

          this.cd.detectChanges();
          this.dbService.openSnackBar('Book removed from favorites successfully.', '');
        },
        error => {
          console.error(error);
          this.dbService.openSnackBar('Failed removing book from favorites.', '');
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

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
