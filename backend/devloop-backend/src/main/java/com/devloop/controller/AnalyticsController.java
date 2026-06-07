package com.devloop.controller;

import com.devloop.dto.AnalyticsResponse;
import com.devloop.repository.ProjectRepository;
import com.devloop.repository.SprintRepository;
import com.devloop.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AnalyticsController {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final SprintRepository sprintRepository;

    @GetMapping("/summary")
    public AnalyticsResponse getSummary() {

        long totalProjects = projectRepository.count();

        long totalTasks = taskRepository.count();

        long completedTasks = taskRepository.findAll()
                .stream()
                .filter(t -> "COMPLETED".equalsIgnoreCase(t.getStatus()))
                .count();

        long activeSprints = sprintRepository.findAll()
                .stream()
                .filter(s -> "ACTIVE".equalsIgnoreCase(s.getStatus()))
                .count();

        double completionPercentage = totalTasks == 0
                ? 0
                : ((double) completedTasks / totalTasks) * 100;

        return new AnalyticsResponse(
                totalProjects,
                totalTasks,
                completedTasks,
                activeSprints,
                completionPercentage
        );
    }
}