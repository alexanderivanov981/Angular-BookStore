package com.softuni.angular.project.BookStore.users;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    @Autowired
    private AppUserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<AppUser> user = authService.authenticate(username, password);
        if (user.isPresent()) {
            // User authenticated successfully
            // Return user data along with the token
            Map<String, Object> response = new HashMap<>();
            response.put("token", JwtUtil.generateToken(user.get().getUsername()));
            response.put("user", user.get()); // Include user data in the response
            return ResponseEntity.ok(response);
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser user) {
    	Optional<AppUser> appUser = userService.getUserByUsername(user.getUsername());
    	if (appUser.isPresent())
    	{
    		return new ResponseEntity<>(appUser.get(), HttpStatus.CONFLICT);
    	}
    	
        AppUser registeredUser = userService.createUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}