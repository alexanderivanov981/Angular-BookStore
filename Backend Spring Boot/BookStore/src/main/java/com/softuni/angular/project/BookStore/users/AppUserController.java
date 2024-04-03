package com.softuni.angular.project.BookStore.users;

import java.util.List;
import java.util.Map;
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
    public ResponseEntity<AppUser> createUser(@RequestBody AppUser user) {
        AppUser newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
	
	
	@GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Long id) {
        Optional<AppUser> user = userService.getUserById(id);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
	
	
	@GetMapping("/{username}")
    public ResponseEntity<AppUser> getUserByUsername(@PathVariable String username) {
        Optional<AppUser> user = userService.getUserByUsername(username);
        return user.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

	
    @GetMapping
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable Long id, @RequestBody AppUser user) {
        AppUser updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId, @RequestBody Map<String, String> requestBody) {
        // Retrieve user information from the database
        Optional<AppUser> optionalUser = userService.getUserById(userId);
        String password = requestBody.get("password");
        
        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();
            
            // Verify password
            if (userService.verifyPassword(user, password)) {
                // Passwords match, delete the user
                userService.deleteUser(userId);
                return ResponseEntity.ok().build(); // User deleted successfully
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
            }
        } else {
            return ResponseEntity.notFound().build(); // User not found
        }
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
    
    
    @PutMapping("/{userId}/cart")
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
    
    
    @DeleteMapping("/{userId}/cart")
    public ResponseEntity<?> removeAllFromCart(@PathVariable Long userId) {
        userService.removeAllFromCart(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    
    @GetMapping("/{userId}/cart")
    public ResponseEntity<List<Book>> getCart(@PathVariable Long userId) {
        List<Book> favoriteBooks = userService.getCart(userId);
        return new ResponseEntity<>(favoriteBooks, HttpStatus.OK);
    }
}