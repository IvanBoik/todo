package com.boiko.todo_list.controller;

import com.boiko.todo_list.service.TaskLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/task_logs")
@RequiredArgsConstructor
public class TaskLogController {
    private final TaskLogService taskLogService;

    @GetMapping("/all/{id}")
    public ResponseEntity<?> findAll(@PathVariable Long id) {
        return ResponseEntity.ok(taskLogService.findAllAndCheck(id));
    }
}
