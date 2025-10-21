package com.pattama.users_management_system.dto.response;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private String role;
    private String city;
}
