package com.enaa.itsupport.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role; // ADMIN, TECHNICIAN, USER
    private boolean active;

    @OneToMany(mappedBy = "requester")
    private List<SupportTicket> requestedTickets = new ArrayList<>();

    @OneToMany(mappedBy = "assignedTechnician")
    private List<SupportTicket> assignedTickets = new ArrayList<>();

    @OneToMany(mappedBy = "technician")
    private List<Issue> resolvedIssues = new ArrayList<>();
} 