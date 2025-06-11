package com.enaa.itsupport.service;

import com.enaa.itsupport.model.SupportTicket;
import com.enaa.itsupport.model.User;
import com.enaa.itsupport.repository.SupportTicketRepository;
import com.enaa.itsupport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketService {
    
    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private UserRepository userRepository;

    public List<SupportTicket> getAllTickets() {
        return supportTicketRepository.findAll();
    }

    public Optional<SupportTicket> getTicketById(Long id) {
        return supportTicketRepository.findById(id);
    }

    public SupportTicket createTicket(SupportTicket ticket) {
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setStatus("OPEN");
        return supportTicketRepository.save(ticket);
    }

    public SupportTicket assignTicket(Long ticketId, Long technicianId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
            .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + ticketId));

        User technician = userRepository.findById(technicianId)
            .orElseThrow(() -> new RuntimeException("Technician not found with id: " + technicianId));

        if (!"TECHNICIAN".equals(technician.getRole())) {
            throw new RuntimeException("User is not a technician");
        }

        ticket.setAssignedTechnician(technician);
        ticket.setStatus("ASSIGNED");
        ticket.setUpdatedAt(LocalDateTime.now());
        
        return supportTicketRepository.save(ticket);
    }

    public SupportTicket updateTicket(Long id, SupportTicket ticketDetails) {
        SupportTicket ticket = supportTicketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        ticket.setTitle(ticketDetails.getTitle());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setPriority(ticketDetails.getPriority());
        ticket.setStatus(ticketDetails.getStatus());
        ticket.setUpdatedAt(LocalDateTime.now());

        if ("RESOLVED".equals(ticketDetails.getStatus())) {
            ticket.setResolvedAt(LocalDateTime.now());
        }

        return supportTicketRepository.save(ticket);
    }

    public void deleteTicket(Long id) {
        SupportTicket ticket = supportTicketRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
        supportTicketRepository.delete(ticket);
    }

    public List<SupportTicket> getTicketsByRequester(Long requesterId) {
        return supportTicketRepository.findByRequesterId(requesterId);
    }

    public List<SupportTicket> getTicketsByTechnician(Long technicianId) {
        return supportTicketRepository.findByAssignedTechnicianId(technicianId);
    }

    public List<SupportTicket> getTicketsByStatus(String status) {
        return supportTicketRepository.findByStatus(status);
    }

    public List<SupportTicket> getTicketsByEquipment(Long equipmentId) {
        return supportTicketRepository.findByEquipmentId(equipmentId);
    }
} 