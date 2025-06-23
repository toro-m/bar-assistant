package com.codecool.backend.service;

import com.codecool.backend.model.Table;
import com.codecool.backend.repository.TableDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {
    private final TableDao tableDao;

    @Autowired
    public TableService(TableDao tableDao) {
        this.tableDao = tableDao;
    }

    public List<Table> getAllTables() {
        return tableDao.getAllTables();
    }

    public Optional<Table> getTable(int tableNumber) {
        Table table = tableDao.getTable(tableNumber);
        return Optional.ofNullable(table);
    }

    public boolean addTable(int availableSeats, boolean reserved) {
        Table table = new Table(availableSeats, reserved);
        return tableDao.addTable(table);
    }

    public boolean reserveTable(int tableNumber) {
        return tableDao.reserveTable(tableNumber);
    }

    public boolean deleteTable(int tableNumber) {
        return tableDao.deleteTable(tableNumber);
    }
}
