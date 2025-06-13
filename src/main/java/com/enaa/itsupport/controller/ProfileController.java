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
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract username from token (in a real app, you would validate the JWT token)
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            // For now, we'll use the token as the username since we're using a dummy token
            String username = token;

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

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> profileData) {
        try {
            // Extract username from token
            String token = authHeader.substring(7);
            String username = token;

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