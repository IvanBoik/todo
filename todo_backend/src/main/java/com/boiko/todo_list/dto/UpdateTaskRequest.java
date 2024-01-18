package com.boiko.todo_list.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record UpdateTaskRequest(
        Long id,
        String title,
        String description,
        LocalDate deadlineDate,
        LocalTime deadlineTime,
        Integer priority
) {
}
