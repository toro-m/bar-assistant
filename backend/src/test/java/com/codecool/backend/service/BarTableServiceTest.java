package com.codecool.backend.service;

import com.codecool.backend.DTO.TableDTO;
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
    void valamiTest() {
        List<TableDTO> allTables = barTableService.getAllTables();
        assertEquals(0, allTables.size());
    }

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

        EntityNotFoundException exception =
                assertThrows(EntityNotFoundException.class, () -> {
                    barTableService.getTable(1);
                });

    }

    @Test
    void testGetTable_whenTableExists_returnValidTable() {
        BarTable table1 = new BarTable(1, 4);
        when(barTableRepository.findByTableNumber(1)).thenReturn(table1);
        TableDTO result = barTableService.getTable(1);
        assertEquals(table1.getTableNumber(), result.tableNumber());
        assertEquals(table1.getAvailableSeats(), result.numOfSeats());
    }




}