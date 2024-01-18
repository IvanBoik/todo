package com.boiko.todo_list.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("TaskLog")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskLog {
    @Id
    private String actionTime;
    private String description;
    private Task task;
}
