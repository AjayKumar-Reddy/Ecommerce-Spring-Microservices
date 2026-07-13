package com.enterprise.ecommerce.user_service.service;

import com.enterprise.ecommerce.user_service.dto.*;
import com.enterprise.ecommerce.user_service.model.User;
import com.enterprise.ecommerce.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse register(UserRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        String role = request.getRole();
        if (role == null || role.trim().isEmpty()) {
            role = "USER";
        } else {
            role = role.toUpperCase();
            if (!role.equals("USER") && !role.equals("SELLER") && !role.equals("ADMIN")) {
                role = "USER";
            }
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(hashPassword(request.getPassword()))
                .email(request.getEmail())
                .fullName(request.getFullName())
                .role(role)
                .address(request.getAddress())
                .build();

        User savedUser = userRepository.save(user);
        return UserResponse.fromUser(savedUser);
    }

    public LoginResponse login(UserLoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!user.getPassword().equals(hashPassword(request.getPassword()))) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate a mock token for Phase 1
        String token = "mock-jwt-token-" + user.getId() + "-" + user.getUsername();
        return new LoginResponse(token, UserResponse.fromUser(user));
    }

    public UserResponse getProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.fromUser(user);
    }

    public UserResponse getProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.fromUser(user);
    }

    public UserResponse updateProfile(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            user.setPassword(hashPassword(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return UserResponse.fromUser(updatedUser);
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
