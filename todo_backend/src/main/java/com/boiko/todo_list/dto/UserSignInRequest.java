package com.boiko.todo_list.dto;

public record UserSignInRequest(
        String email,
        String password
) {
}
