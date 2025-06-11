package com.enaa.itsupport.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String severity;
    private String status;
    private LocalDateTime reportedDate;
    private LocalDateTime resolvedDate;
    private String resolution;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private User technician;
} 