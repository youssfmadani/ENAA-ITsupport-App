package com.enaa.itsupport.controller;

import com.enaa.itsupport.model.Issue;
import com.enaa.itsupport.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueService.getAllIssues();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {
        return issueService.createIssue(issue);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable Long id, @RequestBody Issue issue) {
        try {
            Issue updatedIssue = issueService.updateIssue(id, issue);
            return ResponseEntity.ok(updatedIssue);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        try {
            issueService.deleteIssue(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/equipment/{equipmentId}")
    public List<Issue> getIssuesByEquipment(@PathVariable Long equipmentId) {
        return issueService.getIssuesByEquipment(equipmentId);
    }

    @GetMapping("/status/{status}")
    public List<Issue> getIssuesByStatus(@PathVariable String status) {
        return issueService.getIssuesByStatus(status);
    }

    @GetMapping("/technician/{technicianId}")
    public List<Issue> getIssuesByTechnician(@PathVariable Long technicianId) {
        return issueService.getIssuesByTechnician(technicianId);
    }
} 