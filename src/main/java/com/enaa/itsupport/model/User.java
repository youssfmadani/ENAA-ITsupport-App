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

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String role; // ADMIN, TECHNICIAN, USER

    @Column(nullable = false)
    private boolean active = true;

    @OneToMany(mappedBy = "requester")
    private List<SupportTicket> requestedTickets = new ArrayList<>();

    @OneToMany(mappedBy = "assignedTechnician")
    private List<SupportTicket> assignedTickets = new ArrayList<>();

    @OneToMany(mappedBy = "technician")
    private List<Issue> resolvedIssues = new ArrayList<>();
} 