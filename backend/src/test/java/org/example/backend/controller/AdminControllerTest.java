package org.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        CustomOAuth2UserService customOAuth2UserService = new CustomOAuth2UserService();
        OAuth2UserRequest userRequest = Mockito.mock(OAuth2UserRequest.class);

        // Create a map for attributes
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", "12345678"); // Non-admin user ID

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
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getAdminData_withAdminRole_shouldReturnOk() throws Exception {
        // Perform the request as an admin
        mockMvc.perform(get("/api/admin")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Admin data"));
    }

    @Test
    @WithMockUser(roles = "USER")
    void getAdminData_withUserRole_shouldReturnForbidden() throws Exception {
        // Perform the request as a regular user
        mockMvc.perform(get("/api/admin")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }
}
