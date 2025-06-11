package com.enaa.itsupport.repository;

import com.enaa.itsupport.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByEquipmentId(Long equipmentId);
    List<Issue> findByStatus(String status);
    List<Issue> findByTechnicianId(Long technicianId);
} 