package com.enaa.itsupport.controller;

import com.enaa.itsupport.model.SupportTicket;
import com.enaa.itsupport.service.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

    @GetMapping
    public List<SupportTicket> getAllTickets() {
        return supportTicketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportTicket> getTicketById(@PathVariable Long id) {
        return supportTicketService.getTicketById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SupportTicket createTicket(@RequestBody SupportTicket ticket) {
        return supportTicketService.createTicket(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupportTicket> updateTicket(@PathVariable Long id, @RequestBody SupportTicket ticket) {
        try {
            SupportTicket updatedTicket = supportTicketService.updateTicket(id, ticket);
            return ResponseEntity.ok(updatedTicket);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{ticketId}/assign/{technicianId}")
    public ResponseEntity<SupportTicket> assignTicket(
            @PathVariable Long ticketId,
            @PathVariable Long technicianId) {
        try {
            SupportTicket assignedTicket = supportTicketService.assignTicket(ticketId, technicianId);
            return ResponseEntity.ok(assignedTicket);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        try {
            supportTicketService.deleteTicket(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/requester/{requesterId}")
    public List<SupportTicket> getTicketsByRequester(@PathVariable Long requesterId) {
        return supportTicketService.getTicketsByRequester(requesterId);
    }

    @GetMapping("/technician/{technicianId}")
    public List<SupportTicket> getTicketsByTechnician(@PathVariable Long technicianId) {
        return supportTicketService.getTicketsByTechnician(technicianId);
    }

    @GetMapping("/status/{status}")
    public List<SupportTicket> getTicketsByStatus(@PathVariable String status) {
        return supportTicketService.getTicketsByStatus(status);
    }

    @GetMapping("/equipment/{equipmentId}")
    public List<SupportTicket> getTicketsByEquipment(@PathVariable Long equipmentId) {
        return supportTicketService.getTicketsByEquipment(equipmentId);
    }
} 