package com.devloop.controller;

import com.devloop.ai.OllamaService;
import com.devloop.entity.Task;
import com.devloop.repository.TaskRepository;
import java.util.List;
import com.devloop.dto.DevOpsRequest;

import com.devloop.dto.CodeReviewRequest;
import com.devloop.dto.AgentRequest;
import com.devloop.dto.AgentResponse;
import com.devloop.entity.AgentOutput;
import com.devloop.entity.ActivityLog;
import com.devloop.repository.ActivityLogRepository;
import com.devloop.repository.AgentOutputRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AgentController {

    private final OllamaService ollamaService;
    private final AgentOutputRepository agentOutputRepository;
    private final TaskRepository taskRepository;
    private final ActivityLogRepository activityLogRepository;

    @PostMapping("/run")
    public AgentResponse runAgent(@RequestBody AgentRequest request) {

        String finalPrompt = buildPrompt(request.getAgentType(), request.getInput());

        String aiResponse = ollamaService.generateResponse(finalPrompt);

        AgentOutput output = AgentOutput.builder()
                .projectId(request.getProjectId())
                .agentType(request.getAgentType())
                .prompt(finalPrompt)
                .response(aiResponse)
                .createdAt(LocalDateTime.now())
                .build();

        agentOutputRepository.save(output);
        activityLogRepository.save(ActivityLog.builder()
                .projectId(request.getProjectId())
                .action("AI Agent executed: " + request.getAgentType())
                .module("AI_AGENT")
                .performedBy("SYSTEM")
                .createdAt(LocalDateTime.now())
                .build());

        return new AgentResponse(request.getAgentType(), aiResponse);
    }

    private String buildPrompt(String agentType, String input) {

        return switch (agentType.toUpperCase()) {
            case "TASK_GENERATOR" -> """
        Act as a Senior Agile Project Manager.

        Generate:
        1. Sprint Plan
        2. Development Tasks
        3. Priority (HIGH/MEDIUM/LOW)
        4. Estimated Duration
        5. Dependencies

        Return in structured format.

        Project:
        """ + input;

            case "REQUIREMENTS" -> """
                    Act as a Senior Business Analyst.
                    Generate:
                    1. User roles
                    2. Functional requirements
                    3. Non-functional requirements
                    4. User stories
                    5. Core modules
                    
                    Project idea:
                    """ + input;

            case "DESIGN" -> """
                    Act as a Senior Software Architect.
                    Generate:
                    1. System architecture
                    2. Database schema
                    3. API endpoints
                    4. Frontend pages
                    5. Recommended tech stack
                    
                    Project idea:
                    """ + input;

            case "DEVELOPMENT" -> """
                    Act as a Senior Full Stack Developer.
                    Generate:
                    1. Spring Boot entity classes
                    2. Controller structure
                    3. Service structure
                    4. React page structure
                    5. Folder structure
                    
                    Project idea:
                    """ + input;

            case "TESTING" -> """
                    Act as a Senior QA Engineer.
                    Generate:
                    1. Unit test cases
                    2. Integration test cases
                    3. Manual test scenarios
                    4. Edge cases
                    5. Bug-prone areas
                    
                    Project idea:
                    """ + input;

            case "CODE_REVIEW" -> """
                    Act as a Senior Code Reviewer.
                    Review the following code or project idea.
                    Generate:
                    1. Code quality issues
                    2. Security concerns
                    3. Performance problems
                    4. Best practice suggestions
                    
                    Input:
                    """ + input;

            case "DEVOPS" -> """
                    Act as a DevOps Engineer.
                    Generate:
                    1. Dockerfile
                    2. Jenkins pipeline
                    3. Kubernetes deployment YAML
                    4. Deployment checklist
                    5. Environment configuration
                    
                    Project idea:
                    """ + input;

            case "PROJECT_MANAGER" -> """
                    Act as an Agile Project Manager.
                    Generate:
                    1. Sprint plan
                    2. Task breakdown
                    3. Priority list
                    4. Risk assessment
                    5. Delivery timeline
                    
                    Project idea:
                    """ + input;

            default -> """
                    Act as an AI Software Engineering Assistant.
                    Help with:
                    1. Requirements
                    2. Design
                    3. Development
                    4. Testing
                    5. Deployment
                    
                    Input:
                    """ + input;
        };

    }
    @GetMapping("/project/{projectId}")
    public List<AgentOutput> getOutputsByProject(@PathVariable Long projectId) {
        return agentOutputRepository.findByProjectId(projectId);
    }

    @PostMapping("/generate-tasks")
    public String generateTasks(@RequestBody AgentRequest request) {

        String prompt = buildPrompt("TASK_GENERATOR", request.getInput());

        String aiResponse = ollamaService.generateResponse(prompt);

        String[] lines = aiResponse.split("\n");

        for (String line : lines) {

            if (line.startsWith("-")) {

                Task task = Task.builder()
                        .projectId(request.getProjectId())
                        .title(line.replace("-", "").trim())
                        .description("Generated by AI Task Generator")
                        .priority("MEDIUM")
                        .status("TODO")
                        .createdAt(LocalDateTime.now())
                        .build();

                taskRepository.save(task);
            }
        }

        return "Tasks generated successfully";
    }

    @PostMapping("/review-code")
    public AgentResponse reviewCode(@RequestBody CodeReviewRequest request) {

        String prompt = """
            Act as a Senior Software Architect and Code Reviewer.

            Review the following code and provide:

            1. Bugs
            2. Security Issues
            3. Performance Issues
            4. Code Smells
            5. Refactoring Suggestions
            6. Best Practices

            Code:
            """ + request.getCode();

        String response = ollamaService.generateResponse(prompt);

        return new AgentResponse("CODE_REVIEW", response);
    }
    @PostMapping("/devops-generate")
    public AgentResponse generateDevOps(@RequestBody DevOpsRequest request) {

        String prompt = """
            Act as a Senior DevOps Engineer.

            Generate:

            1. Dockerfile
            2. docker-compose.yml
            3. Jenkinsfile
            4. Kubernetes Deployment YAML
            5. Kubernetes Service YAML
            6. Deployment Checklist

            Project:
            """ + request.getProjectDescription();

        String response = ollamaService.generateResponse(prompt);

        return new AgentResponse("DEVOPS_GENERATOR", response);
    }
}
