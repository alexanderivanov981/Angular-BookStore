package com.softuni.angular.project.BookStore.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }
    
    public List<Book> saveAll(List<Book> books) {
        return bookRepository.saveAll(books);
    }

    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            return null;
        }
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setPrice(bookDetails.getPrice());
        book.setPages(bookDetails.getPages());
        book.setDescription(bookDetails.getDescription());
        book.setGenre(bookDetails.getGenre());
        book.setPublicationYear(bookDetails.getPublicationYear());
        book.setCoverUrl(bookDetails.getCoverUrl());
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
