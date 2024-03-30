import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: Book[] = [];
  favoritesIconUrl : string = "https://static-00.iconduck.com/assets.00/heart-icon-512x441-zviestnn.png";
  cartIconUrl: string = "https://static.vecteezy.com/system/resources/previews/027/381/351/original/shopping-cart-icon-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-products-economics-symbol-design-elements-basket-symbol-silhouette-retail-design-elements-vector.jpg";

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.readAllBooks();
  }

  readAllBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        console.log('Fetched books:', this.books);
      }
    );
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}
