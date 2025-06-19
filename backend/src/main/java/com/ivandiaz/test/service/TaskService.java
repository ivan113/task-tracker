package com.ivandiaz.test.service;

import com.ivandiaz.test.dto.TaskDTO;
import com.ivandiaz.test.model.Task;
import com.ivandiaz.test.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public Task add(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setCompleted(false);

        return taskRepository.save(task);
    }

    public Optional<Task> complete(Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(true);
                    return taskRepository.save(task);
                });
    }

    public List<Task> getAll() {
        return taskRepository.findAll();
    }
}
