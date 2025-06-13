package com.enaa.itsupport.controller;

import com.enaa.itsupport.model.User;
import com.enaa.itsupport.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Set default role for new users
            user.setRole("USER");
            // Encode the password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            // Create the user
            User newUser = userService.createUser(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            if (credentials == null || !credentials.containsKey("username") || !credentials.containsKey("password")) {
                throw new RuntimeException("Username and password are required");
            }

            String username = credentials.get("username");
            String password = credentials.get("password");

            if (username == null || username.trim().isEmpty()) {
                throw new RuntimeException("Username is required");
            }

            if (password == null || password.trim().isEmpty()) {
                throw new RuntimeException("Password is required");
            }

            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Invalid username or password"));

            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new RuntimeException("Invalid username or password");
            }

            if (!user.isActive()) {
                throw new RuntimeException("Account is deactivated");
            }

            // Create response without sensitive data
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("username", user.getUsername());
            userResponse.put("email", user.getEmail());
            userResponse.put("firstName", user.getFirstName());
            userResponse.put("lastName", user.getLastName());
            userResponse.put("role", user.getRole());
            userResponse.put("active", user.isActive());

            Map<String, Object> response = new HashMap<>();
            // Create a token that includes the username
            response.put("token", "Bearer " + user.getUsername()); // In a real app, generate a JWT token
            response.put("user", userResponse);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Invalid authorization header");
            }

            // Extract username from token
            String username = authHeader.substring(7); // Remove "Bearer " prefix

            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Create response without sensitive data
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            response.put("role", user.getRole());
            response.put("active", user.isActive());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> profileData) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new RuntimeException("Invalid authorization header");
            }

            // Extract username from token
            String username = authHeader.substring(7); // Remove "Bearer " prefix

            User user = userService.getUserByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update user fields
            user.setFirstName(profileData.get("firstName"));
            user.setLastName(profileData.get("lastName"));
            user.setEmail(profileData.get("email"));

            // Handle password change if provided
            if (profileData.containsKey("currentPassword") && !profileData.get("currentPassword").isEmpty()) {
                if (!passwordEncoder.matches(profileData.get("currentPassword"), user.getPassword())) {
                    throw new RuntimeException("Current password is incorrect");
                }
                if (!profileData.get("newPassword").equals(profileData.get("confirmPassword"))) {
                    throw new RuntimeException("New passwords do not match");
                }
                user.setPassword(passwordEncoder.encode(profileData.get("newPassword")));
            }

            User updatedUser = userService.updateUser(user.getId(), user);

            // Create response without sensitive data
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedUser.getId());
            response.put("username", updatedUser.getUsername());
            response.put("email", updatedUser.getEmail());
            response.put("firstName", updatedUser.getFirstName());
            response.put("lastName", updatedUser.getLastName());
            response.put("role", updatedUser.getRole());
            response.put("active", updatedUser.isActive());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 