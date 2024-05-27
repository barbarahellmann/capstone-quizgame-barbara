package org.example.backend.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final String ADMIN_GITHUB_USER_ID = "162185130";  // Ihre GitHub-Benutzer-ID

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        // Extrahieren GitHub-Benutzer-ID
        Map<String, Object> attributes = oauth2User.getAttributes();
        String userId = null;

        if (attributes.get("id") instanceof Integer) {
            userId = String.valueOf(attributes.get("id"));
        } else if (attributes.get("id") instanceof String) {
            userId = (String) attributes.get("id");
        } else {
            throw new IllegalArgumentException("Unexpected type for user id");
        }

        // Rollen basierend auf der Benutzer-ID zuweisen
        Set<GrantedAuthority> authorities = new HashSet<>(oauth2User.getAuthorities());
        if (ADMIN_GITHUB_USER_ID.equals(userId)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

        return new DefaultOAuth2User(authorities, attributes, "id");
    }
}