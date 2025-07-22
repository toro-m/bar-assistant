package com.codecool.backend.service;

import com.codecool.backend.DTO.LoginUserDTO;
import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.exception.UserAlreadyExistsException;
import com.codecool.backend.model.User;
import com.codecool.backend.repository.UserRepository;
import com.codecool.backend.service.jwt.JwtUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository, AuthenticationManager authenticationManager, JwtUtils jwtUtils, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.encoder = encoder;
    }

    @Transactional
    public void addUser(UserDTO userDTO) {
        User user = new User(userDTO.fullName(), encoder.encode(userDTO.password()),userDTO.email());
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        userRepository.save(user);
    }

     public String login(LoginUserDTO loginDTO) {
         Authentication authentication = authenticationManager.authenticate(
                 new UsernamePasswordAuthenticationToken(
                         loginDTO.email(),
                         loginDTO.password()
                 ));

         SecurityContextHolder.getContext().setAuthentication(authentication);
         return jwtUtils.generateJwtToken(authentication);
     }

    public UserDTO getUserByEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new EntityNotFoundException("User not found with email: " + userEmail);
        }
        return new UserDTO(user.getFullName(), user.getPassword(), user.getEmail());
    }
}
