package com.pattama.users_management_system.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {

//    @NotBlank(message = "Email is required")
    private String email;

//    @NotBlank(message = "Password is required")
    private String password;

//    @NotBlank(message = "Name is required")
    private String name;

    private String role;
    private String city;

}
