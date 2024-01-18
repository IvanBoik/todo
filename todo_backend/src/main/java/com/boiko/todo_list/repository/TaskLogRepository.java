package com.boiko.todo_list.repository;

import com.boiko.todo_list.entity.TaskLogList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface TaskLogRepository extends CrudRepository<TaskLogList, String>, QueryByExampleExecutor<TaskLogList> {
}
