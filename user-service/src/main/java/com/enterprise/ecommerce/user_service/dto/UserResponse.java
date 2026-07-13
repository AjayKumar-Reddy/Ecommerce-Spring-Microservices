package com.enterprise.ecommerce.user_service.dto;

import com.enterprise.ecommerce.user_service.model.User;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private String address;
    private LocalDateTime createdAt;
    
    public static UserResponse fromUser(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .address(user.getAddress())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
