package com.boiko.todo_list.repository;

import com.boiko.todo_list.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query(nativeQuery = true, value = """
    select * from tasks
    where deadline_date between ?1 and ?2
    """)
    List<Task> findByDeadlineBetween(LocalDate from, LocalDate to);

    @Query(nativeQuery = true, value = """
    select * from tasks
    where id_user = ?1 and deadline_date = ?2
    """)
    List<Task> findByDeadlineDateEquals(Long userID, LocalDate date);

    @Query(nativeQuery = true, value = """
    select * from tasks
    where id_user = ?1
    order by deadline_date, deadline_time
    """)
    List<Task> findAllByUserID(Long userID);
}
