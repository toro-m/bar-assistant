package com.codecool.backend.service;

import com.codecool.backend.model.BarTable;
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

    public List<BarTable> getAllTables() {
        return tableDao.getAllTables();
    }

    public Optional<BarTable> getTable(int tableNumber) {
        BarTable barTable = tableDao.getTable(tableNumber);
        return Optional.ofNullable(barTable);
    }

    public boolean addTable(int availableSeats, boolean reserved) {
        BarTable barTable = new BarTable(availableSeats, reserved);
        return tableDao.addTable(barTable);
    }

    public boolean reserveTable(int tableNumber) {
        return tableDao.reserveTable(tableNumber);
    }

    public boolean deleteTable(int tableNumber) {
        return tableDao.deleteTable(tableNumber);
    }
}
