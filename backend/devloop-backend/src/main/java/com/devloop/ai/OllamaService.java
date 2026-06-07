package com.devloop.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OllamaService {

    @Value("${ollama.api.url}")
    private String ollamaApiUrl;

    @Value("${ollama.model}")
    private String model;

    private final RestClient restClient = RestClient.create();

    public String generateResponse(String prompt) {

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "prompt", prompt,
                "stream", false,
                "options", Map.of(
                        "num_predict", 400,
                        "temperature", 0.3
                )
        );

        Map response = restClient.post()
                .uri(ollamaApiUrl)
                .body(requestBody)
                .retrieve()
                .body(Map.class);

        if (response == null || response.get("response") == null) {
            return "No response from AI model";
        }

        return response.get("response").toString();
    }
}