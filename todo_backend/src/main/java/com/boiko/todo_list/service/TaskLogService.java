package com.boiko.todo_list.service;

import com.boiko.todo_list.entity.TaskLog;
import com.boiko.todo_list.entity.TaskLogList;
import com.boiko.todo_list.repository.TaskLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskLogService {
    private final TaskLogRepository taskLogRepository;

    public List<TaskLogList> findAll(Long id) {
        return new ArrayList<>(
                ((List<TaskLogList>) taskLogRepository.findAll())
                .stream()
                .filter(x -> Objects.equals(x.getUserID(), id))
                .toList());
    }

    public void addLog(Long userID, LocalDate day, TaskLog log) {
        String serialDate = day.format(DateTimeFormatter.ISO_LOCAL_DATE);
        TaskLogList logList = taskLogRepository.findById(userID + serialDate)
                .orElse(new TaskLogList(userID + serialDate, serialDate, userID, new ArrayList<>()));

        logList.getTaskLogs().add(0, log);
        taskLogRepository.save(logList);

        check(findAll(userID));
    }

    public List<TaskLogList> findAllAndCheck(Long userID) {
        List<TaskLogList> lists = findAll(userID);
        check(lists);
        return lists;
    }

    private void check(List<TaskLogList> lists) {
        int firstDay = LocalDate.parse(lists.get(0).getDay()).getDayOfYear();
        int lastDay = LocalDate.parse(lists.get(lists.size()-1).getDay()).getDayOfYear();
        while (Math.abs(firstDay - lastDay) > 7) {
            TaskLogList l = lists.remove(lists.size()-1);
            taskLogRepository.delete(l);
            lastDay = LocalDate.parse(lists.get(lists.size()-1).getDay()).getDayOfYear();
        }
        System.out.println(lists);
    }
}
