package com.codecool.backend.controller;

import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addUser(@RequestBody UserDTO userDTO) {
        userService.addUser(userDTO);
    }
}
