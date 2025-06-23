package com.codecool.backend.repository;

import com.codecool.backend.model.BarTable;

import java.util.List;

public interface TableDao {
    List<BarTable> getAllTables();
    BarTable getTable(int tableNumber);
    boolean addTable(BarTable barTable);
    boolean reserveTable(int tableNumber);
    boolean deleteTable(int tableNumber);
}
