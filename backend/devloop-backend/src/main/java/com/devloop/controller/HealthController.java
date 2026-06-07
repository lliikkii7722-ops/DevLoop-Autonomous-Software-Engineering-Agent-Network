package com.devloop.controller;

import com.devloop.dto.HealthResponse;
import com.devloop.entity.Task;
import com.devloop.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
@CrossOrigin("*")
public class HealthController {

    private final TaskRepository taskRepository;

    @GetMapping("/{projectId}")
    public HealthResponse calculateHealth(@PathVariable Long projectId) {

        List<Task> tasks = taskRepository.findByProjectId(projectId);

        long totalTasks = tasks.size();

        long completedTasks = tasks.stream()
                .filter(t -> "COMPLETED".equalsIgnoreCase(t.getStatus()))
                .count();

        int score = totalTasks == 0
                ? 0
                : (int)(((double) completedTasks / totalTasks) * 100);

        String status;

        if(score >= 80)
            status = "HEALTHY";
        else if(score >= 50)
            status = "WARNING";
        else
            status = "CRITICAL";

        return new HealthResponse(
                score >= 80 ? "LOW" : "HIGH",
                score >= 70 ? "LOW" : "MEDIUM",
                score >= 60 ? "LOW" : "HIGH",
                score,
                status
        );
    }
}