package com.codecool.backend.repository;

import com.codecool.backend.model.BarTable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BarTableRepository extends JpaRepository<BarTable, Long> {
    boolean existsByTableNumber(int tableNumber);
    BarTable findByTableNumber(int tableNumber);
}
