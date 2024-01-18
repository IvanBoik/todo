package com.boiko.todo_list.dto;

public record UpdatePasswordRequest(
        Long id,
        String oldPassword,
        String newPassword
) {
}
