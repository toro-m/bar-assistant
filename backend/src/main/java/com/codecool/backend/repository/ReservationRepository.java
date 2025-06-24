package com.codecool.backend.repository;

import com.codecool.backend.model.BarTable;
import com.codecool.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findReservationsByTable_TableNumber(int tableNumber);
}
