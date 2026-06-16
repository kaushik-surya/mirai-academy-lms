package com.miraiacademy.lms.controller;

import com.miraiacademy.lms.entity.Role;
import com.miraiacademy.lms.entity.User;
import com.miraiacademy.lms.repository.UserRepository;
import com.miraiacademy.lms.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthController(AuthenticationManager authenticationManager,
                         UserRepository userRepository,
                         PasswordEncoder passwordEncoder,
                         JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            User user = userOptional.get();
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "role", user.getRole().name()
            ));

            return ResponseEntity.ok(response);
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isBlank() ||
            user.getPassword() == null || user.getPassword().isBlank() ||
            user.getName() == null || user.getName().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name, email, and password are required"));
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(Role.STUDENT); // Default role for registration
        newUser.setActive(true);
        newUser.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("user", Map.of(
                "id", savedUser.getId(),
                "email", savedUser.getEmail(),
                "name", savedUser.getName(),
                "role", savedUser.getRole().name()
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        String email = authentication.getName();
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "authenticated", true,
                    "user", Map.of(
                            "id", user.get().getId(),
                            "email", user.get().getEmail(),
                            "name", user.get().getName(),
                            "role", user.get().getRole().name()
                    )
            ));
        }

        return ResponseEntity.ok(Map.of("authenticated", false));
    }
}