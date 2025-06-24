package com.codecool.backend.exception;

public class DuplicateTableNumberException extends RuntimeException {
    public DuplicateTableNumberException(String message) {
        super(message);
    }
}
