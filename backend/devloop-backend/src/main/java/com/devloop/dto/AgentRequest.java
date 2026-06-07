package com.devloop.dto;

import lombok.Data;

@Data
public class AgentRequest {
    private Long projectId;
    private String agentType;
    private String input;
}