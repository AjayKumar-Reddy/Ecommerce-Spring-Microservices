package com.enterprise.ecommerce.user_service.service;

import com.enterprise.ecommerce.user_service.dto.*;
import com.enterprise.ecommerce.user_service.model.User;
import com.enterprise.ecommerce.user_service.repository.UserRepository;
import com.enterprise.ecommerce.user_service.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

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
                .password(passwordEncoder.encode(request.getPassword()))
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

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate a real JWT token via JwtUtils
        String token = jwtUtils.generateToken(user.getUsername(), user.getId(), user.getRole());
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
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return UserResponse.fromUser(updatedUser);
    }
}
