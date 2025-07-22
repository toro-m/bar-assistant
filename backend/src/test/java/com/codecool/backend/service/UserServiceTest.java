package com.codecool.backend.service;

import com.codecool.backend.DTO.LoginUserDTO;
import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.exception.UserAlreadyExistsException;
import com.codecool.backend.model.User;
import com.codecool.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.codecool.backend.model.Role;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    //todo - re write login with tocken usage


    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    private final String TEST_EMAIL = "test@example.com";
    private final String TEST_PASSWORD = "password123";
    private final String TEST_FULL_NAME = "Test User";
    private User testUser;
    private UserDTO testUserDTO;
    private LoginUserDTO testLoginDTO;

    @BeforeEach
    void setUp() {
        testUser = new User(TEST_FULL_NAME, TEST_PASSWORD, TEST_EMAIL);
        testUserDTO = new UserDTO(TEST_FULL_NAME, TEST_PASSWORD, TEST_EMAIL, Role.ROLE_USER);
        testLoginDTO = new LoginUserDTO(TEST_EMAIL, TEST_PASSWORD);
    }

    @Test
    void testAddUser_NewUser_SuccessfullyAdded() {
        when(userRepository.existsByEmail(TEST_EMAIL)).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        userService.addUser(testUserDTO);

        verify(userRepository).existsByEmail(TEST_EMAIL);
        verify(userRepository).save(userCaptor.capture());
        
        User savedUser = userCaptor.getValue();
        assertAll(
            () -> assertEquals(TEST_EMAIL, savedUser.getEmail()),
            () -> assertEquals(TEST_PASSWORD, savedUser.getPassword()),
            () -> assertEquals(TEST_FULL_NAME, savedUser.getFullName())
        );
    }

    @Test
    void testAddUser_WhenExistingEmail_ThrowsException() {
        when(userRepository.existsByEmail(TEST_EMAIL)).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class,
            () -> userService.addUser(testUserDTO),
            "Expected addUser to throw UserAlreadyExistsException for existing email"
        );
        
        verify(userRepository).existsByEmail(TEST_EMAIL);
        verify(userRepository, never()).save(any(User.class));
    }



    @Test
    void testLogin_WhenNonExistentEmail_ThrowsException() {
        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(null);

        assertThrows(EntityNotFoundException.class,
            () -> userService.login(testLoginDTO),
            "Expected login to throw EntityNotFoundException for non-existent email"
        );
        
        verify(userRepository).findByEmail(TEST_EMAIL);
    }


}