package com.codecool.backend.service;

import com.codecool.backend.DTO.TableDTO;
import com.codecool.backend.exception.DuplicateTableNumberException;
import com.codecool.backend.model.BarTable;
import com.codecool.backend.repository.BarTableRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;


@ExtendWith(MockitoExtension.class)
class BarTableServiceTest {

    @InjectMocks
    BarTableService barTableService;

    @Mock
    private BarTableRepository barTableRepository;
    @Test
    void testGetAllTables_whenNoTablesExist_returnEmptyList() {
        List<TableDTO> allTables = barTableService.getAllTables();
        assertEquals(0, allTables.size());
    }

    @Test
    void testGetAllTables_whenTwoTablesExist_returnListOfValidTables() {
        BarTable table1 = new BarTable(1, 4);
        BarTable table2 = new BarTable(2, 6);
        List<BarTable> tables = List.of(table1, table2);

        when(barTableRepository.findAll()).thenReturn(tables);

        List<TableDTO> result = barTableService.getAllTables();

        assertEquals(2, result.size());

        assertEquals(table1.getTableNumber(), result.get(0).tableNumber());
        assertEquals(table1.getAvailableSeats(), result.get(0).numOfSeats());

        assertEquals(table2.getTableNumber(), result.get(1).tableNumber());
        assertEquals(table2.getAvailableSeats(), result.get(1).numOfSeats());

        verify(barTableRepository, times(1)).findAll();
    }

    @Test
    void testGetTable_whenTableDoesNotExist_throwException() {
        when(barTableRepository.findByTableNumber(1)).thenReturn(null);
        assertThrows(EntityNotFoundException.class, () -> barTableService.getTable(1));
    }

    @Test
    void testGetTable_whenTableExists_returnValidTable() {
        BarTable table1 = new BarTable(1, 4);
        when(barTableRepository.findByTableNumber(1)).thenReturn(table1);
        TableDTO result = barTableService.getTable(1);
        assertEquals(table1.getTableNumber(), result.tableNumber());
        assertEquals(table1.getAvailableSeats(), result.numOfSeats());
    }

    @Test
    void testDeleteTable_whenTableDoesNotExist_throwException() {
        when(barTableRepository.findByTableNumber(1)).thenReturn(null);
        assertThrows(EntityNotFoundException.class, () -> barTableService.deleteTable(1));
    }

    @Test
    void testDeleteTable_whenTableExists_deleteTable() {
        BarTable table1 = new BarTable(1, 4);
        when(barTableRepository.findByTableNumber(1)).thenReturn(table1);
        barTableService.deleteTable(1);
        verify(barTableRepository, times(1)).delete(table1);
    }

    @Test
    void testAddTable_whenTableAlreadyExists_throwException() {
        when(barTableRepository.existsByTableNumber(1)).thenReturn(true);
        assertThrows(DuplicateTableNumberException.class, () -> barTableService.addTable(1, 4));
    }

    @Test
    void testAddTable_whenTableCanBeAdded_addTable() {
        when(barTableRepository.existsByTableNumber(1)).thenReturn(false);
        BarTable result = barTableService.addTable(1, 4);
        verify(barTableRepository, times(1)).save(result);
    }

    @Test
    void testUpdateTable_whenTableDoesNotExist_throwException() {
        when(barTableRepository.findByTableNumber(1)).thenReturn(null);
        assertThrows(EntityNotFoundException.class, () -> barTableService.updateTable(1, new TableDTO(1, 4)));
    }

@Test
    void testUpdateTable_whenTableWithToUpdatedTableNumberAlreadyExists_throwsException() {
        when(barTableRepository.findByTableNumber(1)).thenReturn(new BarTable(1, 4));
        when(barTableRepository.existsByTableNumber(2)).thenReturn(true);
        assertThrows(DuplicateTableNumberException.class, () -> barTableService.updateTable(1, new TableDTO(2, 4)));
    }

    @Test
    void testUpdateTable_whenTableExistsAndNewTableNumberIsUnique_updatesSuccessfully() {
        int currentTableNumber = 1;
        int newTableNumber = 2;
        int newNumOfSeats = 6;

        BarTable existingTable = new BarTable(currentTableNumber, 4);
        TableDTO tableUpdate = new TableDTO(newTableNumber, newNumOfSeats);

        when(barTableRepository.findByTableNumber(currentTableNumber)).thenReturn(existingTable);
        when(barTableRepository.existsByTableNumber(newTableNumber)).thenReturn(false);

        barTableService.updateTable(currentTableNumber, tableUpdate);

        assertEquals(newTableNumber, existingTable.getTableNumber());
        assertEquals(newNumOfSeats, existingTable.getAvailableSeats());
        verify(barTableRepository, times(1)).save(existingTable);
    }

}