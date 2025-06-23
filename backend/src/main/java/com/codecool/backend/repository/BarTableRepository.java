package com.codecool.backend.repository;

import com.codecool.backend.model.BarTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BarTableRepository extends JpaRepository<BarTable, Long> {

    BarTable findByTableNumber(int tableNumber);
}
