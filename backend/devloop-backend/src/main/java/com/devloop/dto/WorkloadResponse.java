package com.devloop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkloadResponse {

    private String memberName;
    private int assignedTasks;
    private int completedTasks;
    private double completionPercentage;
}