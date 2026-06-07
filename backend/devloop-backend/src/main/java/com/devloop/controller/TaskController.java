package com.devloop.controller;

import com.devloop.entity.ActivityLog;
import com.devloop.entity.Task;
import com.devloop.repository.ActivityLogRepository;
import com.devloop.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TaskController {

    private final TaskRepository taskRepository;
    private final ActivityLogRepository activityLogRepository;

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        task.setCreatedAt(LocalDateTime.now());

        if (task.getStatus() == null) {
            task.setStatus("TODO");
        }

        Task savedTask = taskRepository.save(task);

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(savedTask.getProjectId())
                        .action("Task created: " + savedTask.getTitle())
                        .module("TASK")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        return savedTask;
    }

    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProject(@PathVariable Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @PutMapping("/{id}/status")
    public Task updateTaskStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);

        Task updatedTask = taskRepository.save(task);

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(updatedTask.getProjectId())
                        .action("Task status updated to " + status)
                        .module("TASK")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        return updatedTask;
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(task.getProjectId())
                        .action("Task deleted: " + task.getTitle())
                        .module("TASK")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        taskRepository.deleteById(id);

        return "Task deleted successfully";
    }
}