package com.devloop.controller;

import com.devloop.ai.OllamaService;
import com.devloop.dto.ChatRequest;
import com.devloop.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final OllamaService ollamaService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String prompt = """
                You are DevLoop AI Assistant.

                Help software teams with:
                - Requirements
                - Design
                - Coding
                - Testing
                - DevOps
                - Architecture

                User Query:
                """ + request.getMessage();

        String response = ollamaService.generateResponse(prompt);

        return new ChatResponse(response);
    }
}