package org.example.backend.security;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @GetMapping("/me")
    public String getMe(Authentication user) {
        if (user == null) {
            return "anonymousUser";
        }
        return user.getName();
    }
}
