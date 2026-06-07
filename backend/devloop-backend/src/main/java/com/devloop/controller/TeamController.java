package com.devloop.controller;

import com.devloop.dto.WorkloadResponse;
import com.devloop.entity.ActivityLog;
import com.devloop.entity.TeamMember;
import com.devloop.repository.ActivityLogRepository;
import com.devloop.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TeamController {

    private final TeamMemberRepository teamMemberRepository;
    private final ActivityLogRepository activityLogRepository;

    @PostMapping
    public TeamMember addMember(@RequestBody TeamMember member) {

        TeamMember savedMember = teamMemberRepository.save(member);

        activityLogRepository.save(ActivityLog.builder()
                .projectId(savedMember.getProjectId())
                .action("Team member added: " + savedMember.getName())
                .module("TEAM")
                .performedBy("SYSTEM")
                .createdAt(LocalDateTime.now())
                .build());

        return savedMember;
    }

    @GetMapping("/project/{projectId}")
    public List<TeamMember> getMembers(@PathVariable Long projectId) {
        return teamMemberRepository.findByProjectId(projectId);
    }

    @GetMapping("/workload/{projectId}")
    public List<WorkloadResponse> getWorkload(@PathVariable Long projectId) {

        List<TeamMember> members = teamMemberRepository.findByProjectId(projectId);

        return members.stream()
                .map(member -> new WorkloadResponse(
                        member.getName(),
                        10,
                        7,
                        70.0
                ))
                .toList();
    }

    @DeleteMapping("/{id}")
    public String deleteMember(@PathVariable Long id) {

        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        activityLogRepository.save(ActivityLog.builder()
                .projectId(member.getProjectId())
                .action("Team member removed: " + member.getName())
                .module("TEAM")
                .performedBy("SYSTEM")
                .createdAt(LocalDateTime.now())
                .build());

        teamMemberRepository.deleteById(id);

        return "Member deleted";
    }
}