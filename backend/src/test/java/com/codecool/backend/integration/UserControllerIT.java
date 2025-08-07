package com.codecool.backend.integration;

import com.codecool.backend.DTO.LoginUserDTO;
import com.codecool.backend.DTO.UserDTO;
import com.codecool.backend.model.Role;
import com.codecool.backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserControllerIT {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    private String baseUrl;
    private UserDTO testUser;
    private LoginUserDTO loginUserDTO;

    @BeforeEach
    void setUp() {
        baseUrl = "http://localhost:" + port + "/api/users";

        userRepository.deleteAll();

        testUser = new UserDTO(
            "Test User",
            "password123",
            "test@example.com",
            Role.ROLE_USER
        );

        loginUserDTO = new LoginUserDTO(
            "test@example.com",
            "password123"
        );
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    public void registerUser_WithValidData_ShouldReturnCreated() {
        // Arrange
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserDTO> request = new HttpEntity<>(testUser, headers);

        // Act
        ResponseEntity<Void> response = restTemplate.exchange(
            baseUrl,
            HttpMethod.POST,
            request,
            Void.class
        );

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(userRepository.findByEmail(testUser.email()));
    }

    @Test
    public void registerUser_WithDuplicateEmail_ShouldReturnConflict() {
        // Arrange
        restTemplate.postForEntity(baseUrl, testUser, Void.class);
        
        UserDTO duplicateUser = new UserDTO(
            "Another User",
            "password456",
            "test@example.com",
            Role.ROLE_USER
        );
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserDTO> request = new HttpEntity<>(duplicateUser, headers);

        // Act
        ResponseEntity<String> response = restTemplate.exchange(
            baseUrl,
            HttpMethod.POST,
            request,
            String.class
        );

        // Assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertTrue(response.getBody().contains("already exists"));
    }

    @Test
    public void login_WithValidCredentials_ShouldReturnJwtToken() {
        // Arrange
        restTemplate.postForEntity(baseUrl, testUser, Void.class);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO, headers);

        // Act
        ResponseEntity<String> response = restTemplate.exchange(
            baseUrl + "/login",
            HttpMethod.POST,
            request,
            String.class
        );

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertFalse(response.getBody().isEmpty());
    }

    @Test
    public void login_WithInvalidCredentials_ShouldReturnUnauthorized() {
        // Arrange
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<LoginUserDTO> request = new HttpEntity<>(loginUserDTO, headers);

        // Act
        ResponseEntity<String> response = restTemplate.exchange(
            baseUrl + "/login",
            HttpMethod.POST,
            request,
            String.class
        );

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}
