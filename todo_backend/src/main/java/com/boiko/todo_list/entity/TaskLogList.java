package com.boiko.todo_list.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@RedisHash("TaskLogList")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskLogList {
    @Id
    private String id;
    private String day;
    private Long userID;
    private List<TaskLog> taskLogs;
}
