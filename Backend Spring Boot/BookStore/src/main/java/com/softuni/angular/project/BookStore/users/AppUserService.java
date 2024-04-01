package com.softuni.angular.project.BookStore.users;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.softuni.angular.project.BookStore.books.Book;
import com.softuni.angular.project.BookStore.books.BookRepository;

@Service
public class AppUserService {

    @Autowired
    private AppUserRepository userRepository;
    
    @Autowired
    private BookRepository bookRepository;


    public List<AppUsers> getAllUsers() {
        return userRepository.findAll();
    }
    

    public Optional<AppUsers> getUserById(Long id) {
        return userRepository.findById(id);
    }

    
    public AppUsers createUser(AppUsers user) {
        return userRepository.save(user);
    }
    

    public AppUsers updateUser(Long id, AppUsers newUser) {
        if (userRepository.existsById(id)) {
            newUser.setId(id);
            return userRepository.save(newUser);
        }
        
        return null;
    }
    

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    
    public Optional<AppUsers> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    
    public ResponseEntity<String> addToFavorites(Long userId, Long bookId) {
        Optional<AppUsers> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUsers user = optionalUser.get();
            List<Long> favoriteBooksIds = user.getFavoriteBooksIds();
            if (!favoriteBooksIds.contains(bookId))
            {
            	favoriteBooksIds.add(bookId);
            }
            user.setFavoriteBooksIds(favoriteBooksIds);
            userRepository.save(user);
            return new ResponseEntity<>("Book added to favorites successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    
    public ResponseEntity<String> removeFromFavorites(Long userId, Long bookId) {
        Optional<AppUsers> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUsers user = optionalUser.get();
            List<Long> favoriteBooksIds = user.getFavoriteBooksIds();
            if (favoriteBooksIds.contains(bookId))
            {
            	favoriteBooksIds.remove(bookId);
            }
            user.setFavoriteBooksIds(favoriteBooksIds);
            userRepository.save(user);
            return new ResponseEntity<>("Book added to favorites successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    
    public List<Book> getFavoriteBooks(Long userId) {
        Optional<AppUsers> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
        	AppUsers user = optionalUser.get();
            List<Long> favoriteBookIds = user.getFavoriteBooksIds(); 
            return bookRepository.findAllById(favoriteBookIds);
        } else {
            return Collections.emptyList();
        }
    }
    
    
    public ResponseEntity<String> addToCart(Long userId, Long bookId) {
    	Optional<AppUsers> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUsers user = optionalUser.get();
            List<Long> cart = user.getCartBooksIds();
            if (cart.contains(bookId))
            {
            	cart.remove(bookId);
            }
            user.setCartBooksIds(cart);
            userRepository.save(user);
            return new ResponseEntity<>("Book added to favorites successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    
    public ResponseEntity<String> removeFromCart(Long userId, Long bookId) {
        Optional<AppUsers> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUsers user = optionalUser.get();
            List<Long> cart = user.getCartBooksIds();
            if (cart.contains(bookId))
            {
            	cart.remove(bookId);
            }
            user.setCartBooksIds(cart);
            userRepository.save(user);
            return new ResponseEntity<>("Book added to favorites successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    
    public List<Book> getCart(Long userId) {
        Optional<AppUsers> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
        	AppUsers user = optionalUser.get();
            List<Long> cart = user.getCartBooksIds(); 
            return bookRepository.findAllById(cart);
        } else {
            return Collections.emptyList();
        }
    }
}