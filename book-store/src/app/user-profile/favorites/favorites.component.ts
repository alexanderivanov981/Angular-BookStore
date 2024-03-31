import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/home/authentication.service';
import { Book } from 'src/app/home/book';
import { UserService } from 'src/app/home/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  books: Book[] = [];
  favoritesIconUrl: string = "https://static.vecteezy.com/system/resources/previews/010/158/312/original/heart-icon-sign-symbol-design-free-png.png";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

  constructor(private userService: UserService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // Fetch favorite books data from your service or any other source
    this.fetchFavoriteBooks();
  }

  fetchFavoriteBooks() {
    this.userService.getFavoriteBooks(this.authService.currentUserId).subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    debugger;
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
