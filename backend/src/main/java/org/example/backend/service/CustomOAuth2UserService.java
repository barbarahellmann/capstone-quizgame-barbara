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
import java.util.Set;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final String ADMIN_GITHUB_USER_ID = "162185130";  // Replace with your GitHub user ID

    private DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = delegate.loadUser(userRequest);

        // Extract GitHub user ID
        Object idAttr = oauth2User.getAttribute("id");
        String userId = (idAttr != null) ? idAttr.toString() : null;

        // Assign roles based on user ID
        Set<GrantedAuthority> authorities = new HashSet<>(oauth2User.getAuthorities());
        if (ADMIN_GITHUB_USER_ID.equals(userId)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }

        return new DefaultOAuth2User(authorities, oauth2User.getAttributes(), "id");
    }

    public void setDelegate(DefaultOAuth2UserService delegate) {
        this.delegate = delegate;
    }
}