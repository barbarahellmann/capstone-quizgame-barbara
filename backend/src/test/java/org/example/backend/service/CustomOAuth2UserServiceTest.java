package org.example.backend.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CustomOAuth2UserServiceTest {

    @Test
    void loadUser_adminUser_shouldHaveAdminRole() {
        // Arrange
        CustomOAuth2UserService customOAuth2UserService = new CustomOAuth2UserService();
        OAuth2UserRequest userRequest = Mockito.mock(OAuth2UserRequest.class);

        // Create a map for attributes
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "162185130");

        // Mock OAuth2User
        OAuth2User oauth2User = new DefaultOAuth2User(
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "id"
        );

        // Mock the DefaultOAuth2UserService to return our custom oauth2User
        DefaultOAuth2UserService defaultOAuth2UserService = Mockito.mock(DefaultOAuth2UserService.class);
        Mockito.when(defaultOAuth2UserService.loadUser(userRequest)).thenReturn(oauth2User);

        customOAuth2UserService.setDelegate(defaultOAuth2UserService);

        // Act
        OAuth2User result = customOAuth2UserService.loadUser(userRequest);

        // Assert
        assertTrue(result.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")));
    }

    @Test
    void loadUser_nonAdminUser_shouldNotHaveAdminRole() {
        // Arrange
        CustomOAuth2UserService customOAuth2UserService = new CustomOAuth2UserService();
        OAuth2UserRequest userRequest = Mockito.mock(OAuth2UserRequest.class);

        // Create a map for attributes
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "12345678");

        // Mock OAuth2User
        OAuth2User oauth2User = new DefaultOAuth2User(
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "id"
        );

        // Mock the DefaultOAuth2UserService to return our custom oauth2User
        DefaultOAuth2UserService defaultOAuth2UserService = Mockito.mock(DefaultOAuth2UserService.class);
        Mockito.when(defaultOAuth2UserService.loadUser(userRequest)).thenReturn(oauth2User);

        customOAuth2UserService.setDelegate(defaultOAuth2UserService);

        // Act
        OAuth2User result = customOAuth2UserService.loadUser(userRequest);

        // Assert
        assertFalse(result.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN")));
    }
}