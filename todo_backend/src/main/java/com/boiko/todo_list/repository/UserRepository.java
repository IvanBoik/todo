package com.boiko.todo_list.repository;

import com.boiko.todo_list.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(nativeQuery = true, value = "select * from users where email = ?1 and password = ?2")
    Optional<User> signIn(String email, String password);
}
