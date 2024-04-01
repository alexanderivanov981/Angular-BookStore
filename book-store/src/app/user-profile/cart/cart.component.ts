import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/home/auth.service';
import { Book } from 'src/app/home/book';
import { User } from 'src/app/home/user';
import { UserService } from 'src/app/home/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartBooks: Book[] = [];
  favoritesIconUrl: string = "https://static.vecteezy.com/system/resources/previews/010/158/312/original/heart-icon-sign-symbol-design-free-png.png";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchCartBooks();
  }

  fetchCartBooks(): void {
    const user: User | null = this.authService.getCurrentUser();
    if (user)
    {
      this.userService.getCartBooks(user.id).subscribe(
        (books: Book[]) => {
          this.cartBooks = books;
        }
      );
    }
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
