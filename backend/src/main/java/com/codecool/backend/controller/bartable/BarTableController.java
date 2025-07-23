package com.codecool.backend.controller.bartable;

import com.codecool.backend.DTO.TableDTO;
import com.codecool.backend.service.BarTableService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public List<TableDTO> getAllTables() {
        return barTableService.getAllTables();
    }

    @GetMapping("/{tableNumber}")
    public TableDTO getTable(@PathVariable int tableNumber) {
        return barTableService.getTable(tableNumber);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ADMIN')")
    public void addTable(@RequestBody TableDTO tableDTO) {
        barTableService.addTable(tableDTO.tableNumber(), tableDTO.numOfSeats());
    }

    @PatchMapping("/{tableNumber}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void updateTable(@PathVariable int tableNumber, @RequestBody TableDTO tableDTO) {
        barTableService.updateTable(tableNumber, tableDTO);

    }

    @DeleteMapping("/{tableNumber}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTable(@PathVariable int tableNumber) {
        barTableService.deleteTable(tableNumber);
    }


}
