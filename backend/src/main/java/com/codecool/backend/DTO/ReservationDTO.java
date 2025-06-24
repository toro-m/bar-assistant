package com.codecool.backend.DTO;


import java.time.LocalDateTime;

public record ReservationDTO(int tableNumber, LocalDateTime reservationStartTime, LocalDateTime reservationEndTime) {
}
