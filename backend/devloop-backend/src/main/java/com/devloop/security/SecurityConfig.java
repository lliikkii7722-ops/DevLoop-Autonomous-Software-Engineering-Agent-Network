package com.devloop.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

                        .requestMatchers("/api/projects/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER")
                        .requestMatchers("/api/sprints/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER")
                        .requestMatchers("/api/team/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER")
                        .requestMatchers("/api/analytics/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER")
                        .requestMatchers("/api/health/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER")

                        .requestMatchers("/api/tasks/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER", "TESTER")
                        .requestMatchers("/api/agents/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER", "TESTER", "DEVOPS")
                        .requestMatchers("/api/chat/**").hasAnyRole("ADMIN", "PROJECT_MANAGER", "DEVELOPER", "TESTER", "DEVOPS")

                        .requestMatchers("/api/users/me").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}