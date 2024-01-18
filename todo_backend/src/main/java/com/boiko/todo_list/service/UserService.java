package com.boiko.todo_list.service;

import com.boiko.todo_list.dto.UpdateNameAndEmailRequest;
import com.boiko.todo_list.dto.UpdatePasswordRequest;
import com.boiko.todo_list.dto.UserSignInRequest;
import com.boiko.todo_list.dto.UserSignUpRequest;
import com.boiko.todo_list.entity.User;
import com.boiko.todo_list.repository.UserRepository;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User signUp(UserSignUpRequest request) {
        return userRepository.save(
                requestToUser(request)
        );
    }

    private User requestToUser(UserSignUpRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .password(request.password())
                .build();
    }

    public User signIn(UserSignInRequest request) {
        return userRepository.signIn(request.email(), request.password())
                .orElseThrow(() -> new RuntimeException("Password or login incorrect"));
    }

    public User updateNameAndEmail(UpdateNameAndEmailRequest request) {
        User user = getUserByID(request.id());
        user.setEmail(request.email());
        user.setName(request.name());
        return userRepository.save(user);
    }

    private User getUserByID(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with ID = %d not found".formatted(id)));
    }

    public User updatePassword(UpdatePasswordRequest request) throws AuthException {
        User user = getUserByID(request.id());
        if (user.getPassword().equals(request.oldPassword())) {
            user.setPassword(request.newPassword());
            return userRepository.save(user);
        }
        else {
            throw new AuthException("Incorrect password");
        }
    }
}
