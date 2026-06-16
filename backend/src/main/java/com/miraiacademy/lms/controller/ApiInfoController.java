package com.miraiacademy.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiInfoController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> apiRoot() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "MIRAI Tech Academy backend is running",
                "apiVersion", "1.0",
                "availableEndpoints", new String[]{"/api/auth/login", "/api/auth/register", "/api/courses", "/api/admin/users", "/api/stats"}
        ));
    }
}
