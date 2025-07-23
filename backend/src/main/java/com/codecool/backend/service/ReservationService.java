package com.codecool.backend.service;

import com.codecool.backend.DTO.ReservationDTO;
import com.codecool.backend.model.Reservation;
import com.codecool.backend.repository.BarTableRepository;
import com.codecool.backend.repository.ReservationRepository;
import com.codecool.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final BarTableRepository barTableRepository;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository, BarTableRepository barTableRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.barTableRepository = barTableRepository;
        this.userRepository = userRepository;
    }

    public List<ReservationDTO> getAllReservationsByTableNumber(int tableNumber) {
        List<Reservation> reservations = reservationRepository.findReservationsByTable_TableNumber(tableNumber);
        List<ReservationDTO> reservationDTOs = new ArrayList<>();
        for (Reservation reservation : reservations) {
            reservationDTOs.add(new ReservationDTO(reservation.getUserEmail(), reservation.getTableNumber(), reservation.getReservationStartTime(), reservation.getReservationEndTime()));
        }
        return reservationDTOs;
    }

    @Transactional
    public Reservation addReservation(String userEmail, int tableNumber, LocalDateTime reservationStartTime, LocalDateTime reservationEndTime) {
        Reservation reservation = new Reservation(userRepository.findByEmail(userEmail), barTableRepository.findByTableNumber(tableNumber), reservationStartTime, reservationEndTime);
        if (barTableRepository.existsByTableNumber(tableNumber)) {
            reservationRepository.save(reservation);
        }
        return reservation;
    }

    public List<ReservationDTO> getAllReservationsByUser(Long userId) {
        List<Reservation> reservations = reservationRepository.findReservationByUserId(userId);
        List<ReservationDTO> reservationDTOs = new ArrayList<>();
        for (Reservation reservation : reservations) {
            reservationDTOs.add(new ReservationDTO(reservation.getUserEmail(), reservation.getTableNumber(), reservation.getReservationStartTime(), reservation.getReservationEndTime()));
        }
        return reservationDTOs;
    }
}
