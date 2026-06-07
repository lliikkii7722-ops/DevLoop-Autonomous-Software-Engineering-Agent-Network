package com.devloop.controller;

import com.devloop.entity.ActivityLog;
import com.devloop.entity.Project;
import com.devloop.repository.ActivityLogRepository;
import com.devloop.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ActivityLogRepository activityLogRepository;

    @PostMapping
    public Project createProject(@RequestBody Project project) {

        project.setCreatedAt(LocalDateTime.now());

        if (project.getStatus() == null || project.getStatus().isBlank()) {
            project.setStatus("ACTIVE");
        }

        if (project.getPlannedBudget() == null) project.setPlannedBudget(500000.0);
        if (project.getActualCost() == null) project.setActualCost(420000.0);

        if (project.getPlannedDays() == null) project.setPlannedDays(120);
        if (project.getCompletedDays() == null) project.setCompletedDays(90);

        if (project.getTotalTasks() == null) project.setTotalTasks(60);
        if (project.getCompletedTasks() == null) project.setCompletedTasks(48);

        if (project.getDefects() == null) project.setDefects(4);
        if (project.getTestingCoverage() == null) project.setTestingCoverage(85.0);

        if (project.getAvailableHours() == null) project.setAvailableHours(1000);
        if (project.getWorkedHours() == null) project.setWorkedHours(800);

        Project savedProject = projectRepository.save(project);

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(savedProject.getId())
                        .action("Project created: " + savedProject.getTitle())
                        .module("PROJECT")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        return savedProject;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(project.getId())
                        .action("Project deleted: " + project.getTitle())
                        .module("PROJECT")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        projectRepository.deleteById(id);

        return "Project deleted successfully";
    }
}