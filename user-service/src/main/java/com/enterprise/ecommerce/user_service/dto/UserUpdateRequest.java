package com.enterprise.ecommerce.user_service.dto;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String fullName;
    private String address;
    private String password; // optional password update
}
