package com.codecool.backend.model;


import jakarta.persistence.*;

@Entity
public class BarTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private int tableNumber;
    private int availableSeats;

    public BarTable() {
    }

    public BarTable(int tableNumber, int availableSeats) {
        this.tableNumber = tableNumber;
        this.availableSeats = availableSeats;
    }

    public Long getId() {
        return id;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(int tableNumber) {
        this.tableNumber = tableNumber;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

}
