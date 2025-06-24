package com.codecool.backend.controller;

import com.codecool.backend.exception.DuplicaTetableNumberException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class BarTableControllerAdvice {

    @ResponseBody
    @ExceptionHandler(DuplicaTetableNumberException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String duplicaTetableNumberExceptionHandler(DuplicaTetableNumberException ex) {
        return ex.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String entityNotFoundExceptionHandler(EntityNotFoundException ex) {
        return ex.getMessage();
    }
}
