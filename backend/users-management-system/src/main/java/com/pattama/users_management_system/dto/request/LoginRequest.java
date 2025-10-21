package com.pattama.users_management_system.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class LoginRequest {

//    @NotBlank(message = "Email is required")
    private String email;

//    @NotBlank(message = "Password is required")
    private String password;
}
