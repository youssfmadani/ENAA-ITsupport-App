package com.enaa.itsupport.repository;

import com.enaa.itsupport.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByStatus(String status);
    List<Equipment> findByType(String type);
} 