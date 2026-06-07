package com.devloop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HealthResponse {

    private String scheduleRisk;
    private String resourceRisk;
    private String qualityRisk;
    private int healthScore;
    private String overallStatus;
}