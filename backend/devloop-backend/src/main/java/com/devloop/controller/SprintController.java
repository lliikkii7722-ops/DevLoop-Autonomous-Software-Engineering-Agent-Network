package com.devloop.controller;

import com.devloop.entity.ActivityLog;
import com.devloop.entity.Sprint;
import com.devloop.repository.ActivityLogRepository;
import com.devloop.repository.SprintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sprints")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SprintController {

    private final SprintRepository sprintRepository;
    private final ActivityLogRepository activityLogRepository;

    @PostMapping
    public Sprint createSprint(@RequestBody Sprint sprint) {

        Sprint savedSprint = sprintRepository.save(sprint);

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(savedSprint.getProjectId())
                        .action("Sprint created: " + savedSprint.getSprintName())
                        .module("SPRINT")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        return savedSprint;
    }

    @GetMapping("/project/{projectId}")
    public List<Sprint> getSprints(@PathVariable Long projectId) {
        return sprintRepository.findByProjectId(projectId);
    }

    @DeleteMapping("/{id}")
    public String deleteSprint(@PathVariable Long id) {

        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));

        activityLogRepository.save(
                ActivityLog.builder()
                        .projectId(sprint.getProjectId())
                        .action("Sprint deleted: " + sprint.getSprintName())
                        .module("SPRINT")
                        .performedBy("SYSTEM")
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        sprintRepository.deleteById(id);

        return "Sprint deleted successfully";
    }
}