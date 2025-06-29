package com.codecool.backend.controller;

import com.codecool.backend.DTO.LoginUserDTO;
import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.SequencedSet;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginUserDTO loginDTO) {
        boolean login = userService.login(loginDTO);
        if (login) {
            return loginDTO.email();
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login failed! Incorrect email or password.");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addUser(@RequestBody UserDTO userDTO) {
        userService.addUser(userDTO);
    }
}
