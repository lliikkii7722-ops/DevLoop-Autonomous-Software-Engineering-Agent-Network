package com.devloop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnalyticsResponse {

    private long totalProjects;

    private long totalTasks;

    private long completedTasks;

    private long activeSprints;

    private double completionPercentage;
}