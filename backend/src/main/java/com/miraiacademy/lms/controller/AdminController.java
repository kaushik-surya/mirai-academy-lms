package com.miraiacademy.lms.controller;

import com.miraiacademy.lms.entity.User;
import com.miraiacademy.lms.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> listUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = users.stream()
                .map(user -> Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "role", user.getRole().name(),
                        "active", user.isActive(),
                        "studentId", user.getStudentId(),
                        "staffId", user.getStaffId(),
                        "createdAt", user.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
