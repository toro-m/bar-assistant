package com.codecool.backend.service;

import com.codecool.backend.DTO.LoginUserDTO;
import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.exception.UserAlreadyExistsException;
import com.codecool.backend.model.User;
import com.codecool.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void addUser(UserDTO userDTO) {
        User user = new User(userDTO.fullName(), userDTO.password(), userDTO.email());
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        userRepository.save(user);
    }

    public boolean login(LoginUserDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.email());
        if(user == null) {
            throw new EntityNotFoundException("User not found");
        }
        if (user.getPassword().equals(loginDTO.password())) {
            return true;
        } else {
            return false;
        }
    }
}
