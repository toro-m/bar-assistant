package com.codecool.backend.service.dao;

import com.codecool.backend.model.Table;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryTableDao implements TableDao {
    private final Map<Integer, Table> tables = new ConcurrentHashMap<>();

    @Override
    public List<Table> getAllTables() {
        return new ArrayList<>(tables.values());
    }

    @Override
    public Table getTable(int tableNumber) {
        return tables.get(tableNumber);
    }

    @Override
    public boolean addTable(Table table) {
        if (table == null) {
            return false;
        }
        tables.put(table.getTableNum(), table);
        return true;
    }

    @Override
    public boolean reserveTable(int tableNumber) {
        Table table = tables.get(tableNumber);
        if (table == null || table.isReserved()) {
            return false;
        }
        table.setReserved(true);
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