package com.pattama.users_management_system.controller;

import com.pattama.users_management_system.exception.BaseException;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException e) {

        HttpStatus status = e.getStatus();

        ErrorResponse errorResponse = new ErrorResponse();

        errorResponse.setError(e.getMessage());
        errorResponse.setStatus(status.value());

        return new ResponseEntity<>(errorResponse, status);
    }


    @Data
    public static class ErrorResponse {

        private LocalDateTime timestamp = LocalDateTime.now();

        private int status;

        private String error;
    }
}
