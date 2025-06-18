package com.ivandiaz.test.repository;

import com.ivandiaz.test.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
