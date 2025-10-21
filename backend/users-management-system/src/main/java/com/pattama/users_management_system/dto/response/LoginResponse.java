package com.pattama.users_management_system.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private int statusCode;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String message;


}
