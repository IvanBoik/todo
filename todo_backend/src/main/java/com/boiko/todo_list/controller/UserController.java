package com.boiko.todo_list.controller;

import com.boiko.todo_list.dto.UpdateNameAndEmailRequest;
import com.boiko.todo_list.dto.UpdatePasswordRequest;
import com.boiko.todo_list.dto.UserSignInRequest;
import com.boiko.todo_list.dto.UserSignUpRequest;
import com.boiko.todo_list.entity.User;
import com.boiko.todo_list.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/sign_up")
    public ResponseEntity<User> signUp(@RequestBody UserSignUpRequest request) {
        return ResponseEntity.ok(userService.signUp(request));
    }

    @PostMapping("/sign_in")
    public ResponseEntity<?> signIn(@RequestBody UserSignInRequest request) {
        try {
            return ResponseEntity.ok(userService.signIn(request));
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/update_name_and_email")
    public ResponseEntity<?> updateNameAndEmail(@RequestBody UpdateNameAndEmailRequest request) {
        try {
            return ResponseEntity.ok(userService.updateNameAndEmail(request));
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/update_password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest request) {
        try {
            return ResponseEntity.ok(userService.updatePassword(request));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
