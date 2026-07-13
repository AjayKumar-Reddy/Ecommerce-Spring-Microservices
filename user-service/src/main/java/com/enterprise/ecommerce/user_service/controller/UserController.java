package com.enterprise.ecommerce.user_service.controller;

import com.enterprise.ecommerce.user_service.dto.*;
import com.enterprise.ecommerce.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow frontend to call directly if not using proxy
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegisterRequest request) {
        try {
            UserResponse response = userService.register(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginRequest request) {
        try {
            LoginResponse response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader(value = "Authorization", required = false) String tokenHeader) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer mock-jwt-token-")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid authorization token");
        }
        try {
            String token = tokenHeader.substring(7); // Remove "Bearer "
            String[] parts = token.split("-");
            if (parts.length < 4) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Malformed authorization token");
            }
            Long userId = Long.parseLong(parts[3]);
            UserResponse response = userService.getProfile(userId);
            return ResponseEntity.ok(response);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user ID in token");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader(value = "Authorization", required = false) String tokenHeader,
            @RequestBody UserUpdateRequest request) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer mock-jwt-token-")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid authorization token");
        }
        try {
            String token = tokenHeader.substring(7);
            String[] parts = token.split("-");
            if (parts.length < 4) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Malformed authorization token");
            }
            Long userId = Long.parseLong(parts[3]);
            UserResponse response = userService.updateProfile(userId, request);
            return ResponseEntity.ok(response);
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user ID in token");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
