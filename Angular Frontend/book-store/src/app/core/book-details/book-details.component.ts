import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../../shared/book';
import { ActivatedRoute } from '@angular/router';
import { DBService } from '../../shared/db-service.service';
import { User } from '../../shared/user';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  favoriteBooks: Book[] = [];
  favoriteBooks$: Observable<Book[]> | null = null;
  cartBooks: Book[] = [];

  constructor(private route: ActivatedRoute,
              private dbService: DBService, 
              private authService: AuthService,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; // Get the book ID from route parameters
    this.dbService.getBook(id).subscribe((book: Book) => {
      this.book = book;
    });

    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.favoriteBooks$ = this.dbService.getFavoriteBooks(user.id );
      this.loadUserBooks(user.id);
    }
  }

  private loadUserBooks(userId: number): void {
    this.dbService.getFavoriteBooks(userId).subscribe(
      (books) => {
        this.favoriteBooks = books;
        this.cd.detectChanges();
      }
    );

    this.dbService.getCartBooks(userId).subscribe(
      (books) => {
        this.cartBooks = books;
        this.cd.detectChanges();
      }
    );
  }


  // isBookInFavorites(): boolean {
  //   console.log(this.favoriteBooks);
  //   return this.favoriteBooks.length > 0 && this.book !== null && this.favoriteBooks.includes(this.book);
  // }


  // isBookInCart(): boolean {
  //   // console.log(this.cartBooks);
  //   return this.cartBooks.length > 0 && this.book !== null && this.cartBooks.includes(this.book);
  // }


  isBookInFavorites(): boolean {
    return this.favoriteBooks.length > 0 && this.book !== null && this.favoriteBooks.includes(this.book);
  }

  isBookInCart(): boolean {
      return this.cartBooks.length > 0 && this.book !== null && this.cartBooks.includes(this.book);
  }


  // addToFavorites(bookId: number): void {
  //   const user: User | null = this.authService.getCurrentUser();
  //   if (user && this.book)
  //   {
  //     this.dbService.addToFavorites(user.id, bookId).subscribe(
  //       () => {
  //         this.dbService.openSnackBar('Book added to favorites successfully.', '');
  //         this.favoriteBooks.push(this.book as Book);
  //         this.cd.detectChanges();
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.dbService.openSnackBar('Failed adding book to favorites.', '');
  //       }
  //     );
  //   }
  // }


  // addToCart(bookId: number): void {
  //   const user: User | null = this.authService.getCurrentUser();
  //   if (user && this.book)
  //   {
  //     this.dbService.addToCart(user.id, bookId).subscribe(
  //       () => {
  //         this.dbService.openSnackBar('Book added to cart successfully.', '');
  //         this.cartBooks.push(this.book as Book);
  //         this.cd.detectChanges();
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.dbService.openSnackBar('Failed adding book to cart.', '');
  //       }
  //     );
  //   }
  // }

  // removeFromCart(): void {
  //   const user: User | null = this.authService.getCurrentUser();
  //   if (user && this.book)
  //   {
  //     this.dbService.removeFromCart(user.id, this.book.id).subscribe(
  //       () => {
  //         this.dbService.openSnackBar('Book removed from cart successfully.', '');
  //         const index: number = this.cartBooks.indexOf(this.book as Book); // Type assertion
  //         if (index !== -1) {
  //           this.cartBooks.splice(index, 1);
  //           this.cd.detectChanges();
  //         }
  //       },
  //       error => {
  //         console.error(error);
  //         this.dbService.openSnackBar('Failed removing book from cart.', '');
  //       }
  //     )
  //   }
  // }


  // removeFromFavorites(): void {
  //   const user: User | null = this.authService.getCurrentUser();
  //   if (user && this.book)
  //   {
  //     this.dbService.removeFromFavorites(user.id, this.book.id)
  //     .subscribe(
  //       () => {
  //         const index: number = this.favoriteBooks.indexOf(this.book as Book);
  //         if (index !== -1) {
  //           this.favoriteBooks.splice(index, 1);
  //           this.dbService.openSnackBar('Book removed from favorites successfully.', '');
  //           this.cd.detectChanges();
  //         }
  //       },
  //       error => {
  //         console.error(error);
  //         this.dbService.openSnackBar('Failed removing book from favorites.', '');
  //       }
  //     );
  //   }
  // }


  addToFavorites(bookId: number): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user && this.book)
    {
        this.dbService.addToFavorites(user.id, bookId).subscribe(
        () => {
            this.dbService.openSnackBar('Book added to favorites successfully.', '');
            this.favoriteBooks.push(this.book as Book);
            this.cd.detectChanges(); // Update the view
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
    if (user && this.book)
    {
        this.dbService.addToCart(user.id, bookId).subscribe(
        () => {
            this.dbService.openSnackBar('Book added to cart successfully.', '');
            this.cartBooks.push(this.book as Book);
            this.cd.detectChanges(); // Update the view
        },
        (error) => {
            console.error(error);
            this.dbService.openSnackBar('Failed adding book to cart.', '');
        }
        );
    }
}

removeFromCart(): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user && this.book)
    {
        this.dbService.removeFromCart(user.id, this.book.id).subscribe(
        () => {
            this.dbService.openSnackBar('Book removed from cart successfully.', '');
            const index: number = this.cartBooks.indexOf(this.book as Book); // Type assertion
            if (index !== -1) {
                this.cartBooks.splice(index, 1);
                this.cd.detectChanges(); // Update the view
            }
        },
        error => {
            console.error(error);
            this.dbService.openSnackBar('Failed removing book from cart.', '');
        }
        )
    }
}


removeFromFavorites(): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user && this.book)
    {
        this.dbService.removeFromFavorites(user.id, this.book.id)
        .subscribe(
        () => {
            const index: number = this.favoriteBooks.indexOf(this.book as Book);
            if (index !== -1) {
                this.favoriteBooks.splice(index, 1);
                this.dbService.openSnackBar('Book removed from favorites successfully.', '');
                this.cd.detectChanges(); // Update the view
            }
        },
        error => {
            console.error(error);
            this.dbService.openSnackBar('Failed removing book from favorites.', '');
        }
        );
    }
}
}
