package com.codecool.backend.model;


import jakarta.persistence.*;

@Entity
public class BarTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //TODO - make sure to make ths tableNumber unique, as of now, it works but table number can be duplicated
    @Column(unique = true)
    private int tableNumber;
    private int availableSeats;

    public BarTable() {
    }

    public BarTable(int tableNumber ,int availableSeats) {
        this.tableNumber = tableNumber;
        this.availableSeats = availableSeats;
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
