package com.codecool.backend.service;

import com.codecool.backend.DTO.TableDTO;
import com.codecool.backend.repository.BarTableRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


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
}