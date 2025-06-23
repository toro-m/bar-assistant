package com.codecool.backend.repository;

import com.codecool.backend.model.BarTable;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryTableDao implements TableDao {
    private final Map<Integer, BarTable> tables = new ConcurrentHashMap<>();

    @Override
    public List<BarTable> getAllTables() {
        return new ArrayList<>(tables.values());
    }

    @Override
    public BarTable getTable(int tableNumber) {
        return tables.get(tableNumber);
    }

    @Override
    public boolean addTable(BarTable barTable) {
        if (barTable == null) {
            return false;
        }
        tables.put(barTable.getTableNum(), barTable);
        return true;
    }

    @Override
    public boolean reserveTable(int tableNumber) {
        BarTable barTable = tables.get(tableNumber);
        if (barTable == null || barTable.isReserved()) {
            return false;
        }
        barTable.setReserved(true);
        return true;
    }

    @Override
    public boolean deleteTable(int tableNumber) {
        if (!tables.containsKey(tableNumber)) {
            return false;
        }
        tables.remove(tableNumber);
        return true;
    }
}