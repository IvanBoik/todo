package com.boiko.todo_list.controller;

import com.boiko.todo_list.dto.AddTaskRequest;
import com.boiko.todo_list.dto.UpdateTaskRequest;
import com.boiko.todo_list.dto.WeekTasksRequest;
import com.boiko.todo_list.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody AddTaskRequest request) {
        return ResponseEntity.ok(taskService.addTask(request));
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTask(@RequestBody UpdateTaskRequest request) {
        return handleExceptions(
                taskService.updateTask(request)
        );
    }

    private ResponseEntity<?> handleExceptions(Object response) {
        try {
            return ResponseEntity.ok(response);
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/save/{id}")
    public ResponseEntity<?> findByID(@PathVariable Long id) {
        return handleExceptions(
                taskService.findByID(id)
        );
    }

    @GetMapping("/{id}/today")
    public ResponseEntity<?> todayTasks(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.todayTasks(id));
    }

    @GetMapping("/{id}/by_day/{day}")
    public ResponseEntity<?> tasksByDay(
            @PathVariable Long id,
            @PathVariable LocalDate day
    ) {
        return ResponseEntity.ok(taskService.findByDay(id, day));
    }

    @PostMapping("/by_week")
    public ResponseEntity<?> tasksByWeek(@RequestBody WeekTasksRequest request) {
        return handleExceptions(
                taskService.findByWeek(request.startWeek(), request.endWeek())
        );
    }

    @PutMapping("/change_is_done/{taskID}/{value}")
    public ResponseEntity<?> changeIsDone(
            @PathVariable Long taskID,
            @PathVariable boolean value
    ) {
        try {
            taskService.updateIsDone(taskID, value);
            return ResponseEntity.ok("OK");
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.delete(id);
            return ResponseEntity.ok("OK");
        }
        catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userID}")
    public ResponseEntity<?> findAll(@PathVariable Long userID) {
        return ResponseEntity.ok(taskService.findAll(userID));
    }
}
