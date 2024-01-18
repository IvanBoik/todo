package com.boiko.todo_list.dto;

public record UpdateNameAndEmailRequest(
        Long id,
        String name,
        String email
) {
}
