import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/home/auth.service';
import { Book } from 'src/app/home/book';
import { User } from 'src/app/home/user';
import { UserService } from 'src/app/home/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  books: Book[] = [];
  favoritesIconUrl: string = "assets/images/heart-icon-red.jpg";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchFavoriteBooks();
  }

  fetchFavoriteBooks() {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.getFavoriteBooks(user.id).subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
    }
  }

  removeBookFromFavorites(event: MouseEvent, book: Book): void {
    const index: number = this.books.indexOf(book);
    if (index !== -1) {
        this.books.splice(index, 1);
    }  

    event.stopPropagation();
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.removeFromFavorites(user.id, book.id)
      .subscribe(
        () => {
          console.log('Book removed from favorites successfully.');
          this.cd.detectChanges(); // Assuming you need to detect changes here
        },
        error => {
          console.error('Error removing book from favorites:', error);
          // Handle error as needed
        }
      );
    }
  }

  addToCart(event: MouseEvent, book: Book): void {
    event.stopPropagation();

    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.addToCart(user.id, book.id)
      .subscribe(
        () => {
          console.log('Book added to cart.');
        },
        error => {
          console.error('Failed to add book to cart.')
        }
      );
    }
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
