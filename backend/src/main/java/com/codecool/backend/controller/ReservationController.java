package com.codecool.backend.controller;

import com.codecool.backend.DTO.ReservationDTO;
import com.codecool.backend.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createReservation(@RequestBody ReservationDTO reservationDTO) {
        reservationService.addReservation(reservationDTO.tableNumber(), reservationDTO.reservationStartTime(), reservationDTO.reservationEndTime());
    }

}
