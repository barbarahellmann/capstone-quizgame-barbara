package org.example.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${app.url}")
    private String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a
                        .requestMatchers("/api/play").authenticated() // Endpunkte angeben, um sie abzusichern, für nicht eingeloggte Nutzer
                        .requestMatchers("/api/admin").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/quiz").authenticated()
                        .anyRequest().permitAll()) // permitAll definiert, dass Endpunkte offen sind, wie bspw. bei der Anmeldung
                .logout(logout -> logout.logoutSuccessUrl(appUrl))
                .sessionManagement(sessiontemp ->
                        sessiontemp.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl));
        return http.build();
    }
}
