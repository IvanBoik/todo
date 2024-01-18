package com.boiko.todo_list.dto;

public record UserSignUpRequest(
        String name,
        String email,
        String password
) {
}
