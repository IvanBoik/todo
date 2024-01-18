package com.boiko.todo_list.dto;

import java.time.LocalDate;

public record WeekTasksRequest(
        LocalDate startWeek,
        LocalDate endWeek
) {
}
