package com.softuni.angular.project.BookStore.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUsers, Long> {
	Optional<AppUsers> findByUsername(String username);
}