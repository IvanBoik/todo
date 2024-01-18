package com.boiko.todo_list.dto;

import jakarta.annotation.Nullable;

import java.time.LocalDate;
import java.time.LocalTime;

public record AddTaskRequest(
        Long userID,
        String title,
        String description,
        @Nullable
        LocalDate deadlineDate,
        @Nullable
        LocalTime deadlineTime,
        Integer priority
) {
}
