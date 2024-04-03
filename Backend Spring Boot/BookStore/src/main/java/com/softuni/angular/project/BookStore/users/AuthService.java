package com.softuni.angular.project.BookStore.users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AppUserRepository userRepository;
    
    public Optional<AppUser> authenticate(String username, String password) {
        Optional<AppUser> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
        	AppUser user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }
        
        return Optional.empty();
    }
}