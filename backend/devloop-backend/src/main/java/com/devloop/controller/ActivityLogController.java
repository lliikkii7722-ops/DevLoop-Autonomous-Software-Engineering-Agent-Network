package com.devloop.controller;

import com.devloop.entity.ActivityLog;
import com.devloop.repository.ActivityLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ActivityLogController {

    private final ActivityLogRepository activityLogRepository;

    @GetMapping("/project/{projectId}")
    public List<ActivityLog> getProjectActivity(@PathVariable Long projectId) {
        return activityLogRepository.findByProjectId(projectId);
    }
}