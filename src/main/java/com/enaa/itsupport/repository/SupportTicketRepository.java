package com.enaa.itsupport.repository;

import com.enaa.itsupport.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByRequesterId(Long requesterId);
    List<SupportTicket> findByAssignedTechnicianId(Long technicianId);
    List<SupportTicket> findByStatus(String status);
    List<SupportTicket> findByEquipmentId(Long equipmentId);
} 