package com.enaa.itsupport.service;

import com.enaa.itsupport.model.Issue;
import com.enaa.itsupport.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IssueService {
    
    @Autowired
    private IssueRepository issueRepository;

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public Optional<Issue> getIssueById(Long id) {
        return issueRepository.findById(id);
    }

    public Issue createIssue(Issue issue) {
        issue.setReportedDate(LocalDateTime.now());
        return issueRepository.save(issue);
    }

    public Issue updateIssue(Long id, Issue issueDetails) {
        Issue issue = issueRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        issue.setDescription(issueDetails.getDescription());
        issue.setSeverity(issueDetails.getSeverity());
        issue.setStatus(issueDetails.getStatus());
        issue.setResolution(issueDetails.getResolution());
        
        if ("RESOLVED".equals(issueDetails.getStatus()) && issue.getResolvedDate() == null) {
            issue.setResolvedDate(LocalDateTime.now());
        }

        return issueRepository.save(issue);
    }

    public void deleteIssue(Long id) {
        Issue issue = issueRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));
        issueRepository.delete(issue);
    }

    public List<Issue> getIssuesByEquipment(Long equipmentId) {
        return issueRepository.findByEquipmentId(equipmentId);
    }

    public List<Issue> getIssuesByStatus(String status) {
        return issueRepository.findByStatus(status);
    }

    public List<Issue> getIssuesByTechnician(Long technicianId) {
        return issueRepository.findByTechnicianId(technicianId);
    }
} 