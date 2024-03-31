import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/home/book';
import { BookService } from 'src/app/home/book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartBooks: Book[] = [];
  favoritesIconUrl: string = "https://static.vecteezy.com/system/resources/previews/010/158/312/original/heart-icon-sign-symbol-design-free-png.png";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

  constructor(private bookService: BookService, private router: Router) { }

  fetchCartBooks(): void {
    // Assuming you have a method in your book service to fetch cart books
    // this.bookService.getCartBooks().subscribe(
    //   (books: Book[]) => {
    //     this.cartBooks = books;
    //   }
    // );
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
