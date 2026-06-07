package com.devloop.dto;

import lombok.Data;

@Data
public class CodeReviewRequest {

    private Long projectId;

    private String code;
}