package com.softuni.angular.project.BookStore.users;

import java.util.Collections;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AppUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    @ElementCollection
    private List<Long> favoriteBooksIds;
    @ElementCollection
    private List<Long> cartBooksIds;
    
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public List<Long> getFavoriteBooksIds() {
		return (favoriteBooksIds == null) ? Collections.emptyList() : favoriteBooksIds;
	}
	
	public void setFavoriteBooksIds(List<Long> favoriteBooksIds) {
		this.favoriteBooksIds = favoriteBooksIds;
	}
	
	public List<Long> getCartBooksIds() {
		return (cartBooksIds == null) ? Collections.emptyList() : cartBooksIds;
	}
	
	public void setCartBooksIds(List<Long> cartBooksIds) {
		this.cartBooksIds = cartBooksIds;
	}
}