package com.codecool.backend.DTO;

import com.codecool.backend.model.Role;

public record UserDTO(String fullName, String password, String email, Role role) {
}
