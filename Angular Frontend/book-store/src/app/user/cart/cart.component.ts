import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Book } from 'src/app/shared/book';
import { User } from 'src/app/shared/user';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartBooks: Book[] = [];
  favoritesIconUrl: string = "/assets/images/heart-icon-red.jpg";
  shoppingCartIconUrl: string = "/assets/images/cart-remove.png";

  constructor(
    private dbService: DBService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCartBooks();
  }

  fetchCartBooks(): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.getCartBooks(user.id).subscribe(
        (books: Book[]) => {
          this.cartBooks = books;
        }
      );
    }
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

  removeFromCart(event: MouseEvent, book: Book): void {
    event.stopPropagation();

    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.dbService.removeFromCart(user.id, book.id).subscribe(
        () => {
          const index: number = this.cartBooks.indexOf(book);
          if (index !== -1) {
              this.cartBooks.splice(index, 1);
          } 

          this.cd.detectChanges();
          this.dbService.openSnackBar('Book removed from cart successfully.', '');
        },
        error => {
          console.error(error);
          this.dbService.openSnackBar('Failed removing book from cart.', '');
        }
      )
    }
  }

  calculateTotalSum(): number {
    let totalSum = 0;
    this.cartBooks.forEach(book => {
      totalSum += book.price;
    });
    return totalSum;
  }

  placeOrder(): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user && this.cartBooks.length > 0)
    {
      this.dbService.removeAllFromCart(user.id).subscribe(
        () => {
          this.cartBooks = [];
          this.cd.detectChanges();
          this.dbService.openSnackBar('Order is on the way!', '');
        },
        error => {
          console.error(error);
          this.dbService.openSnackBar('Failed creating an order!', '');
        }
      )
    }
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
