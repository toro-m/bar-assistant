package com.codecool.backend.service;

import com.codecool.backend.DTO.ReservationDTO;
import com.codecool.backend.model.Reservation;
import com.codecool.backend.repository.BarTableRepository;
import com.codecool.backend.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final BarTableRepository barTableRepository;

    public ReservationService(ReservationRepository reservationRepository,  BarTableRepository barTableRepository) {
        this.reservationRepository = reservationRepository;
        this.barTableRepository = barTableRepository;
    }


    @Transactional
    public void addReservation(int tableNumber, LocalDateTime reservationStartTime, LocalDateTime reservationEndTime) {
        Reservation reservation = new Reservation(barTableRepository.findByTableNumber(tableNumber), reservationStartTime, reservationEndTime);
        if (barTableRepository.existsByTableNumber(tableNumber)) {
            reservationRepository.save(reservation);
        }
    }
}
