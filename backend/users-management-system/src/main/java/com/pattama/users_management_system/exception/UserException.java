package com.pattama.users_management_system.exception;

import org.springframework.http.HttpStatus;

public class UserException extends BaseException {

    public UserException(String code, HttpStatus status) {
        super("user." + code, status);
    }

    public static UserException userNotFound() {
        return new UserException("not.found", HttpStatus.NOT_FOUND);
    }

    // CREATE EXCEPTION
    public static UserException emailNull() {
        return new UserException("email.null", HttpStatus.BAD_REQUEST);
    }

    public static UserException emailDuplicated() {
        return new UserException("email.duplicated", HttpStatus.BAD_REQUEST);
    }

    public static UserException passwordNull() {
        return new UserException("password.null", HttpStatus.BAD_REQUEST);
    }

    public static UserException roleNull() {
        return new UserException("role.null", HttpStatus.BAD_REQUEST);
    }

    // LOGIN EXCEPTION
    public static UserException tokenInvalid() {
        return new UserException("token.invalid", HttpStatus.UNAUTHORIZED);
    }

    public static UserException loginFailEmailNotFound() {
        return new UserException("login.fail", HttpStatus.UNAUTHORIZED);
    }

    public static UserException loginFailPasswordIncorrect() {
        return new UserException("login.fail", HttpStatus.UNAUTHORIZED);
    }

    public static UserException userUnauthorized() {
        return new UserException("unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
