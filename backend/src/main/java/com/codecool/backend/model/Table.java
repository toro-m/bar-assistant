package com.codecool.backend.model;

public class Table {
    private static int nextTableNumber = 1;
    private int tableNum;
    private final int availableSeats;
    private boolean reserved;

    public Table( int availibleSeatls, boolean reserved) {
        tableNum = nextTableNumber++;
        this.availableSeats = availibleSeatls;
        this.reserved = reserved;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public int getTableNum() {
        return tableNum;
    }

    public void setTableNum(int tableNum) {
        this.tableNum = tableNum;
    }
}
