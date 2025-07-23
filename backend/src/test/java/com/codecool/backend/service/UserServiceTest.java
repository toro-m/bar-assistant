package com.codecool.backend.service;

import com.codecool.backend.DTO.LoginUserDTO;
import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.exception.UserAlreadyExistsException;
import com.codecool.backend.model.User;
import com.codecool.backend.repository.UserRepository;
import com.codecool.backend.service.jwt.JwtUtils;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    private final String TEST_EMAIL = "test@example.com";
    private final String TEST_PASSWORD = "password123";
    private final String TEST_PASSWORD_ENCODED = "encodedPassword123";
    private final String TEST_FULL_NAME = "Test User";
    private final String TEST_TOKEN = "test.jwt.token";

    private User testUser;
    private UserDTO testUserDTO;
    private LoginUserDTO testLoginDTO;

    @BeforeEach
    void setUp() {
        testUser = new User(TEST_FULL_NAME, TEST_PASSWORD, TEST_EMAIL);
        testUser.setRole(Role.ROLE_USER);
        testUserDTO = new UserDTO(TEST_FULL_NAME, TEST_PASSWORD, TEST_EMAIL, Role.ROLE_USER);
        testLoginDTO = new LoginUserDTO(TEST_EMAIL, TEST_PASSWORD);

        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testAddUser_NewUser_SuccessfullyAdded() {
        when(userRepository.existsByEmail(TEST_EMAIL)).thenReturn(false);
        when(passwordEncoder.encode(TEST_PASSWORD)).thenReturn(TEST_PASSWORD_ENCODED);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        userService.addUser(testUserDTO);

        verify(userRepository).existsByEmail(TEST_EMAIL);
        verify(passwordEncoder).encode(TEST_PASSWORD);
        verify(userRepository).save(userCaptor.capture());
        
        User savedUser = userCaptor.getValue();
        assertAll(
            () -> assertEquals(TEST_EMAIL, savedUser.getEmail()),
            () -> assertEquals(TEST_PASSWORD_ENCODED, savedUser.getPassword()),
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
    void testLogin_WhenUserExists_ReturnsToken() {
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn(TEST_TOKEN);

        String result = userService.login(testLoginDTO);

        assertEquals(TEST_TOKEN, result);

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtUtils).generateJwtToken(authentication);
        verify(securityContext).setAuthentication(authentication);
    }





}