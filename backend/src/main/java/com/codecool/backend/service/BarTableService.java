package com.codecool.backend.service;

import com.codecool.backend.DTO.TableDTO;
import com.codecool.backend.exception.DuplicateTableNumberException;
import com.codecool.backend.model.BarTable;
import com.codecool.backend.repository.BarTableRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BarTableService {
    private final BarTableRepository barTableRepository;

    public BarTableService(BarTableRepository barTableRepository) {
        this.barTableRepository = barTableRepository;
    }

    public List<TableDTO> getAllTables() {
        List<BarTable> tables = barTableRepository.findAll();
        List<TableDTO> tableDTOs = new ArrayList<>();
        for (BarTable table : tables) {
            tableDTOs.add(new TableDTO(table.getTableNumber(), table.getAvailableSeats()));
        }
        return tableDTOs;
    }

    public TableDTO getTable(int tableNumber) {
        BarTable barTable = barTableRepository.findByTableNumber(tableNumber);
        if (barTable == null) {
            throw new EntityNotFoundException("Table number " + tableNumber+ " not found");
        }
        return new TableDTO(barTable.getTableNumber(), barTable.getAvailableSeats());
    }


    public void deleteTable(int tableNumber) {
        BarTable barTable = barTableRepository.findByTableNumber(tableNumber);
        if (barTable == null) {
            throw new EntityNotFoundException("Table cannot be deleted, because table cannot be found.");
        }
        barTableRepository.delete(barTable);
    }

    @Transactional
    public BarTable addTable(int tableNumber, int availableSeats) {
        BarTable barTable = new BarTable(tableNumber, availableSeats);
        if (barTableRepository.existsByTableNumber(barTable.getTableNumber())) {
            throw new DuplicateTableNumberException(tableNumber+" already exists");
        }
         barTableRepository.save(barTable);
        return barTable;
    }

    @Transactional
    public void updateTable(int tableNumber, TableDTO tableUpdate) {
        BarTable existingTable = barTableRepository.findByTableNumber(tableNumber);
                if(existingTable == null) {
                    throw new EntityNotFoundException("Table not found");
                }
        if (tableUpdate.tableNumber() != existingTable.getTableNumber() &&
                barTableRepository.existsByTableNumber(tableUpdate.tableNumber())) {
            throw new DuplicateTableNumberException(tableUpdate.tableNumber() +" already exists, cannot update");
        }

        existingTable.setTableNumber(tableUpdate.tableNumber());
        existingTable.setAvailableSeats(tableUpdate.numOfSeats());
         barTableRepository.save(existingTable);
    }

}
