package com.devloop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String description;

    private String status;

    private String techStack;

    private LocalDateTime createdAt;
    private Double plannedBudget;
    private Double actualCost;

    private Integer plannedDays;
    private Integer completedDays;

    private Integer totalTasks;
    private Integer completedTasks;

    private Integer defects;
    private Double testingCoverage;

    private Integer availableHours;
    private Integer workedHours;
}