package com.devloop.repository;

import com.devloop.entity.AgentOutput;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgentOutputRepository extends JpaRepository<AgentOutput, Long> {
    List<AgentOutput> findByProjectId(Long projectId);
}