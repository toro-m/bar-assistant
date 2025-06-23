package com.codecool.backend.repository;

import com.codecool.backend.model.Table;

import java.util.List;

public interface TableDao {
    List<Table> getAllTables();
    Table getTable(int tableNumber);
    boolean addTable(Table table);
    boolean reserveTable(int tableNumber);
    boolean deleteTable(int tableNumber);
}
