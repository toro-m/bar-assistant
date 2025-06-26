package com.codecool.backend.service;


import com.codecool.backend.DTO.ReservationDTO;
import com.codecool.backend.model.BarTable;
import com.codecool.backend.model.Reservation;
import com.codecool.backend.model.User;
import com.codecool.backend.repository.BarTableRepository;
import com.codecool.backend.repository.ReservationRepository;
import com.codecool.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BarTableRepository barTableRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    @Test
    void getAllReservationsByTableNumber_noReservations_returnEmptyList() {
        int tableNumber = 1;

        when(reservationRepository.findReservationsByTable_TableNumber(tableNumber))
                .thenReturn(List.of());

        List<ReservationDTO> result = reservationService.getAllReservationsByTableNumber(tableNumber);

        assertEquals(0, result.size());
        verify(reservationRepository).findReservationsByTable_TableNumber(tableNumber);
    }

    @Test
    void getAllReservationsByTableNumber_twoReservations_returnListOfValidReservations() {
        int tableNumber = 1;
        User user1 = new User("user1@example.com", "password1", "User One");
        User user2 = new User("user2@example.com", "password2", "User Two");

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start1 = now.plusHours(1);
        LocalDateTime end1 = now.plusHours(3);
        LocalDateTime start2 = now.plusHours(4);
        LocalDateTime end2 = now.plusHours(6);

        BarTable table = new BarTable(1, 4);

        Reservation reservation1 = new Reservation(user1, table, start1, end1);
        Reservation reservation2 = new Reservation(user2, table, start2, end2);
        List<Reservation> reservations = List.of(reservation1, reservation2);

        when(reservationRepository.findReservationsByTable_TableNumber(tableNumber))
                .thenReturn(reservations);

        List<ReservationDTO> result = reservationService.getAllReservationsByTableNumber(tableNumber);

        assertEquals(2, result.size());

        assertEquals(user1.getEmail(), result.getFirst().userEmail());
        assertEquals(tableNumber, result.getFirst().tableNumber());
        assertEquals(start1, result.getFirst().reservationStartTime());
        assertEquals(end1, result.getFirst().reservationEndTime());

        assertEquals(user2.getEmail(), result.get(1).userEmail());
        assertEquals(tableNumber, result.get(1).tableNumber());
        assertEquals(start2, result.get(1).reservationStartTime());
        assertEquals(end2, result.get(1).reservationEndTime());

        verify(reservationRepository).findReservationsByTable_TableNumber(tableNumber);
    }

    @Test
    void testAddReservation_whenReservationCanBeAdded_addReservation(){
        String userEmail = "user1@example.com";
        int tableNumber = 1;
        when(userRepository.findByEmail(userEmail)).thenReturn(new User("username", "password1", userEmail));
        when(barTableRepository.findByTableNumber(tableNumber)).thenReturn(new BarTable(tableNumber, 4));
        LocalDateTime reservationStartTime = LocalDateTime.now();
        LocalDateTime reservationEndTime = LocalDateTime.now().plusHours(2);
        when(barTableRepository.existsByTableNumber(tableNumber)).thenReturn(true);

        Reservation result = reservationService.addReservation(userEmail, tableNumber, reservationStartTime, reservationEndTime);

        verify(reservationRepository).save(result);

        assertEquals(userEmail, result.getUserEmail());
        assertEquals(tableNumber, result.getTableNumber());
        assertEquals(reservationStartTime, result.getReservationStartTime());
        assertEquals(reservationEndTime, result.getReservationEndTime());

    }

    @Test
    void getAllReservationsByUser_noReservations_returnEmptyList() {
        Long userId = 1L;
        when(reservationRepository.findReservationByUserId(userId))
                .thenReturn(Collections.emptyList());

        List<ReservationDTO> result = reservationService.getAllReservationsByUser(userId);

        assertTrue(result.isEmpty());
        verify(reservationRepository).findReservationByUserId(userId);
    }

    @Test
    void getAllReservationsByUser_multipleReservations_returnListOfReservations() {
        User user = new User("test@example.com", "password", "Test User");

        LocalDateTime now = LocalDateTime.now();
        BarTable table1 = new BarTable(1, 4);
        BarTable table2 = new BarTable(2, 6);

        Reservation reservation1 = new Reservation(user, table1, now.plusHours(1), now.plusHours(3));
        Reservation reservation2 = new Reservation(user, table2, now.plusDays(1), now.plusDays(1).plusHours(2));

        List<Reservation> reservations = List.of(reservation1, reservation2);

        when(reservationRepository.findReservationByUserId(user.getId()))
                .thenReturn(reservations);

        List<ReservationDTO> result = reservationService.getAllReservationsByUser(user.getId());

        assertEquals(2, result.size());

        assertEquals(user.getEmail(), result.getFirst().userEmail());
        assertEquals(table1.getTableNumber(), result.getFirst().tableNumber());
        assertEquals(reservation1.getReservationStartTime(), result.getFirst().reservationStartTime());
        assertEquals(reservation1.getReservationEndTime(), result.getFirst().reservationEndTime());

        assertEquals(user.getEmail(), result.get(1).userEmail());
        assertEquals(table2.getTableNumber(), result.get(1).tableNumber());
        assertEquals(reservation2.getReservationStartTime(), result.get(1).reservationStartTime());
        assertEquals(reservation2.getReservationEndTime(), result.get(1).reservationEndTime());

        verify(reservationRepository).findReservationByUserId(user.getId());
    }

    @Test
    void getAllReservationsByUser_userHasNoReservations_returnEmptyList() {
        Long userId = 999L;
        when(reservationRepository.findReservationByUserId(userId))
                .thenReturn(Collections.emptyList());

        List<ReservationDTO> result = reservationService.getAllReservationsByUser(userId);

        assertTrue(result.isEmpty());
        verify(reservationRepository).findReservationByUserId(userId);
    }

}