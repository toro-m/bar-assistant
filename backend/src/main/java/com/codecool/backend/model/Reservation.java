package com.codecool.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "table_id")
    private BarTable table;
    private LocalDateTime reservationStartTime;
    private LocalDateTime reservationEndTime;

    public Reservation() {
    }

    public Reservation(User user, BarTable table, LocalDateTime reservationStartTime, LocalDateTime reservationEndTime) {
        this.user = user;
        this.table = table;
        this.reservationStartTime = reservationStartTime;
        this.reservationEndTime = reservationEndTime;
    }

    public String getUserEmail() {
        return user.getEmail();
    }


    public int getTableNumber() {
        return table.getTableNumber();
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
