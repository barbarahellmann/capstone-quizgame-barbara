package security;

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
                        .requestMatchers("/api/*").authenticated()
                        .requestMatchers("/api/auth/me").authenticated() // Endpunkte angeben, um sie abzusichern, für nicht eingeloggte Nutzer
                        .requestMatchers("/api/secured").authenticated()
                        .requestMatchers("/api/play").authenticated()
                        .requestMatchers("/api/admin").authenticated()
                        .requestMatchers("/api/result").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/quiz").authenticated()
                        .anyRequest().permitAll()  // permitAll definiert, dass Endpunkte offen sind, wie bspw. bei der Anmeldung
                )
                .sessionManagement(sessiontemp ->
                        sessiontemp.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl));
        return http.build();
    }
}


