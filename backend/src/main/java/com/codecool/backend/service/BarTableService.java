package com.codecool.backend.service;

import com.codecool.backend.model.BarTable;
import com.codecool.backend.repository.BarTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarTableService {
    private final BarTableRepository barTableRepository;

    public BarTableService(BarTableRepository barTableRepository) {
        this.barTableRepository = barTableRepository;
    }

    public List<BarTable> getAllTables() {
        return barTableRepository.findAll();
    }

    public Optional<BarTable> getTable(int tableNumber) {
        BarTable barTable = barTableRepository.findByTableNumber(tableNumber);
        return Optional.ofNullable(barTable);
    }

    public void addTable(int tableNumber, int availableSeats) {
        BarTable barTable = new BarTable(tableNumber, availableSeats);
        barTableRepository.save(barTable);
    }

    public void deleteTable(int tableNumber) {
        barTableRepository.delete(barTableRepository.findByTableNumber(tableNumber));
    }

}
