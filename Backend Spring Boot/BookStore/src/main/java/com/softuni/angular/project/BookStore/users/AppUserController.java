package com.softuni.angular.project.BookStore.users;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.softuni.angular.project.BookStore.books.Book;

@RestController
@RequestMapping("/api/appusers")
public class AppUserController {

	@Autowired
    private AppUserService userService;
	
	
	@PostMapping
    public ResponseEntity<AppUsers> createUser(@RequestBody AppUsers user) {
        AppUsers newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
	
	
	@GetMapping("/{id}")
    public ResponseEntity<AppUsers> getUserById(@PathVariable Long id) {
        Optional<AppUsers> user = userService.getUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	
	
	@GetMapping("/username/{username}")
    public ResponseEntity<AppUsers> getUserByUsername(@PathVariable String username) {
        Optional<AppUsers> user = userService.getUserByUsername(username);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	

    @GetMapping
    public ResponseEntity<List<AppUsers>> getAllUsers() {
        List<AppUsers> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<AppUsers> updateUser(@PathVariable Long id, @RequestBody AppUsers user) {
        AppUsers updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    
    @PostMapping("/{userId}/favorite-books")
    public ResponseEntity<?> addToFavorites(@PathVariable Long userId, @RequestBody Long bookId) {
        userService.addToFavorites(userId, bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @DeleteMapping("/{userId}/favorite-books/{bookId}")
    public ResponseEntity<?> removeFromFavorites(@PathVariable Long userId, @PathVariable Long bookId) {
        userService.removeFromFavorites(userId, bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @GetMapping("/{userId}/favorite-books")
    public ResponseEntity<List<Book>> getFavoriteBooks(@PathVariable Long userId) {
        List<Book> favoriteBooks = userService.getFavoriteBooks(userId);
        return new ResponseEntity<>(favoriteBooks, HttpStatus.OK);
    }
    
    
    @PostMapping("/{userId}/cart")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody Long bookId)
    {
    	userService.addToCart(userId, bookId);
    	return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @DeleteMapping("/{userId}/cart/{bookId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @PathVariable Long bookId) {
        userService.removeFromCart(userId, bookId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @GetMapping("/{userId}/cart")
    public ResponseEntity<List<Book>> getCart(@PathVariable Long userId) {
        List<Book> favoriteBooks = userService.getCart(userId);
        return new ResponseEntity<>(favoriteBooks, HttpStatus.OK);
    }
}