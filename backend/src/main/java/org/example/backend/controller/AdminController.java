package org.example.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping
    public ResponseEntity<String> getAdminData(Principal principal) {
        if (principal != null) {
            // Assuming that ROLE_ADMIN check is already handled by security configuration
            return ResponseEntity.ok("Admin data");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
    }
}