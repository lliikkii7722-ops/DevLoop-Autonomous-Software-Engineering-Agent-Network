package com.devloop.dto;

import lombok.Data;

@Data
public class ChatRequest {

    private Long projectId;

    private String message;
}