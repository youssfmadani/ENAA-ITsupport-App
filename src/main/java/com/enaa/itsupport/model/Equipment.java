package com.enaa.itsupport.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String serialNumber;
    private String type;
    private String status;
    private LocalDateTime purchaseDate;
    private String manufacturer;
    private String model;
    private String location;
    private String notes;

    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<Issue> issues = new ArrayList<>();

    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<SupportTicket> supportTickets = new ArrayList<>();
} 