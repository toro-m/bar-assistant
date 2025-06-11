package com.codecool.backend.controller;

import com.codecool.backend.DTO.NewTableDTO;
import com.codecool.backend.model.Table;
import com.codecool.backend.service.TableService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {
    private final TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @GetMapping("/all")
    public List<Table> getAllTables() {
        return tableService.getAllTables();
    }

    @GetMapping("/{tableNumber}")
    public Table getTable(@PathVariable int tableNumber) {
        return tableService.getTable(tableNumber).orElse(null);
    }

    @PostMapping
    public boolean addTable(@RequestBody NewTableDTO newTableDTO) {
        return tableService.addTable(newTableDTO.numOfSeats(), newTableDTO.reserved());
    }

    @DeleteMapping("/{tableNumber}")
    public boolean deleteTable(@PathVariable int tableNumber) {
        return tableService.deleteTable(tableNumber);
    }

    @PatchMapping("/reserve/{tableNumber}")
    public boolean reserveTable(@PathVariable int tableNumber) {
        return tableService.reserveTable(tableNumber);
    }
}
