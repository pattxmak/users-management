package com.pattama.users_management_system.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public abstract class BaseException extends RuntimeException {

    private final HttpStatus status;

    public BaseException(String code, HttpStatus status) {
        super(code);
        this.status = status;
    }

}
