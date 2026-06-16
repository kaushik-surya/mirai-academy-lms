package com.miraiacademy.lms.controller;

import com.miraiacademy.lms.entity.Role;
import com.miraiacademy.lms.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    private final UserRepository userRepository;

    public StatsController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        LocalDateTime activeSince = LocalDateTime.now().minusMinutes(15);

        Map<String, Long> totalByRole = Map.of(
                "admin", userRepository.countByRole(Role.ADMIN),
                "staff", userRepository.countByRole(Role.STAFF),
                "student", userRepository.countByRole(Role.STUDENT)
        );

        Map<String, Long> onlineByRole = Map.of(
                "admin", userRepository.countByRoleAndLastLoginAtAfter(Role.ADMIN, activeSince),
                "staff", userRepository.countByRoleAndLastLoginAtAfter(Role.STAFF, activeSince),
                "student", userRepository.countByRoleAndLastLoginAtAfter(Role.STUDENT, activeSince)
        );

        return ResponseEntity.ok(Map.of(
                "totalUsers", totalByRole.values().stream().mapToLong(Long::longValue).sum(),
                "totalByRole", totalByRole,
                "onlineByRole", onlineByRole,
                "activeSince", activeSince.toString()
        ));
    }
}
