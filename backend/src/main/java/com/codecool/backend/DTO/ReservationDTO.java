package com.codecool.backend.DTO;


import java.time.LocalDateTime;

public record ReservationDTO(String userEmail,int tableNumber, LocalDateTime reservationStartTime, LocalDateTime reservationEndTime) {
}
