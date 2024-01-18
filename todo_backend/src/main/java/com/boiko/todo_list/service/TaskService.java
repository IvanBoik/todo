package com.boiko.todo_list.service;

import com.boiko.todo_list.dto.AddTaskRequest;
import com.boiko.todo_list.dto.UpdateTaskRequest;
import com.boiko.todo_list.entity.Task;
import com.boiko.todo_list.entity.TaskLog;
import com.boiko.todo_list.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskLogService taskLogService;

    public Task addTask(AddTaskRequest request) {
        Task task = taskRepository.save(
                requestToTask(request)
        );
        TaskLog log = new TaskLog(
                LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                "Добавлена задача %s".formatted(task.getTitle()),
                task);
        taskLogService.addLog(request.userID(), LocalDate.now(), log);

        return task;
    }

    private Task requestToTask(AddTaskRequest request) {
        return Task.builder()
                .userID(request.userID())
                .title(request.title())
                .description(request.description())
                .dateAdded(LocalDateTime.now())
                .deadlineDate(request.deadlineDate())
                .deadlineTime(request.deadlineTime())
                .priority(request.priority())
                .build();
    }

    public Task updateTask(UpdateTaskRequest request) {
        Task task = findByID(request.id());
        LocalDate today = LocalDate.now();
        updateTitle(task, request.title(), today);
        updateDescription(task, request.description(), today);
        updateDeadline(task, request.deadlineDate(), request.deadlineTime(), today);
        updatePriority(task, request.priority(), today);

        return taskRepository.save(task);
    }

    private void updateTitle(Task task, String title, LocalDate day) {
        if (notEquals(task.getTitle(), title)) {
            String oldTitle = task.getTitle();
            task.setTitle(title);
            taskLogService.addLog(
                    task.getUserID(),
                    day,
                    new TaskLog(
                            LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                            "Изменено название задачи %s на %s".formatted(oldTitle, title),
                            task
                    )
            );
        }
    }

    private void updateDescription(Task task, String description, LocalDate day) {
        if (notEquals(task.getDescription(), description)) {
            task.setDescription(description);
            taskLogService.addLog(
                    task.getUserID(),
                    day,
                    new TaskLog(
                            LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                            "Изменено описание задачи %s на %s".formatted(task.getTitle(), description),
                            task
                    )
            );
        }
    }

    private void updateDeadline(Task task, LocalDate deadlineDate, LocalTime deadlineTime, LocalDate day) {
        if (notEquals(task.getDeadlineTime(), deadlineTime)) {
            task.setDeadlineDate(deadlineDate);
            task.setDeadlineTime(deadlineTime);
            String timeString = deadlineTime == null
                    ? ""
                    : "T" + deadlineTime;
            taskLogService.addLog(
                    task.getUserID(),
                    day,
                    new TaskLog(
                            LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                            "Изменен дедлайн задачи %s на %s".formatted(
                                    task.getTitle(),
                                    deadlineDate + timeString
                            ),
                            task
                    )
            );
        }
        else if (notEquals(task.getDeadlineDate(), deadlineDate)) {
            task.setDeadlineDate(deadlineDate);
            taskLogService.addLog(
                    task.getUserID(),
                    day,
                    new TaskLog(
                            LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                            "Изменен дедлайн задачи %s на %s".formatted(task.getTitle(), deadlineDate),
                            task
                    )
            );
        }
    }

    private void updatePriority(Task task, Integer priority, LocalDate day) {
        if (notEquals(task.getPriority(), priority)) {
            task.setPriority(priority);
            taskLogService.addLog(
                    task.getUserID(),
                    day,
                    new TaskLog(
                            LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                            "Изменен приоритет задачи %s на %s".formatted(task.getTitle(), priority),
                            task
                    )
            );
        }
    }

    private <T> boolean notEquals(T obj1, T obj2) {
        return !Objects.equals(obj1, obj2);
    }

    public Task findByID(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task with ID = %d not found".formatted(id)));
    }

    public List<Task> todayTasks(Long userID) {
        return findByDay(userID, LocalDate.now());
    }

    public List<Task> findByDay(Long userID, LocalDate day) {
        return taskRepository.findByDeadlineDateEquals(userID, day);
    }

    public List<Task> findByWeek(LocalDate startWeek, LocalDate endWeek) {
        if (startWeek.isAfter(endWeek)) {
            throw new RuntimeException("Incorrect dates");
        }
        return taskRepository.findByDeadlineBetween(startWeek, endWeek);
    }

    public void updateIsDone(Long id, boolean value) {
        Task task = findByID(id);
        task.setDone(value);
        taskRepository.save(task);
        String message = value
                ? "выполненная"
                : "не выполненная";
        taskLogService.addLog(
                task.getUserID(),
                LocalDate.now(),
                new TaskLog(
                        LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                        "Задача %s помечена как %s".formatted(task.getTitle(), message),
                        task
                )
        );
    }

    public void delete(Long id) {
        Task task = findByID(id);
        taskRepository.delete(task);

        taskLogService.addLog(
                task.getUserID(),
                LocalDate.now(),
                new TaskLog(
                        LocalTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME),
                        "Задача %s удалена".formatted(task.getTitle()),
                        task
                )
        );
    }

    public List<Task> findAll(Long id) {
        return taskRepository.findAllByUserID(id);
    }
}
