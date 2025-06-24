package com.codecool.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "table_id")
    private BarTable table;
    private LocalDateTime reservationStartTime;
    private LocalDateTime reservationEndTime;

    public Reservation() {
    }

    public Reservation(BarTable table, LocalDateTime reservationStartTime, LocalDateTime reservationEndTime) {
        this.table = table;
        this.reservationStartTime = reservationStartTime;
        this.reservationEndTime = reservationEndTime;
    }

    public BarTable getTable() {
        return table;
    }

    public void setTable(BarTable table) {
        this.table = table;
    }

    public LocalDateTime getReservationStartTime() {
        return reservationStartTime;
    }

    public void setReservationStartTime(LocalDateTime reservationStartTime) {
        this.reservationStartTime = reservationStartTime;
    }

    public LocalDateTime getReservationEndTime() {
        return reservationEndTime;
    }

    public void setReservationEndTime(LocalDateTime reservationEndTime) {
        this.reservationEndTime = reservationEndTime;
    }
}
