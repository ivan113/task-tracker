package com.ivandiaz.test.controller;

import com.ivandiaz.test.dto.TaskDTO;
import com.ivandiaz.test.model.Task;
import com.ivandiaz.test.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> add(@RequestBody TaskDTO taskDTO) {
        Task result =  taskService.add(taskDTO);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id) {
        return taskService.complete(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll() {
        return ResponseEntity.ok(taskService.getAll());
    }

}
