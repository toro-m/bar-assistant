package com.codecool.backend.controller;

import com.codecool.backend.DTO.NewTableDTO;
import com.codecool.backend.model.BarTable;
import com.codecool.backend.service.BarTableService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class BarTableController {
    private final BarTableService barTableService;

    public BarTableController(BarTableService barTableService) {
        this.barTableService = barTableService;
    }

    @GetMapping
    public List<BarTable> getAllTables() {
        return barTableService.getAllTables();
    }

    @GetMapping("/{tableNumber}")
    public BarTable getTable(@PathVariable int tableNumber) {
        return barTableService.getTable(tableNumber).orElse(null);
    }

    @PostMapping
    public void addTable(@RequestBody NewTableDTO newTableDTO) {
        //todo return 201 http code
         barTableService.addTable(newTableDTO.tableNumber(), newTableDTO.numOfSeats());
    }

    @DeleteMapping("/{tableNumber}")
    public void deleteTable(@PathVariable int tableNumber) {
         barTableService.deleteTable(tableNumber);
    }


}
