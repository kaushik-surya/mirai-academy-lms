package com.miraiacademy.lms.controller;

import com.miraiacademy.lms.entity.User;
import com.miraiacademy.lms.entity.Enrollment;
import com.miraiacademy.lms.entity.Enrollment.PaymentStatus;
import com.miraiacademy.lms.repository.CourseRepository;
import com.miraiacademy.lms.repository.EnrollmentRepository;
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
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AdminController(UserRepository userRepository, CourseRepository courseRepository, EnrollmentRepository enrollmentRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

  @GetMapping("/users")
public ResponseEntity<List<Map<String, Object>>> listUsers() {

    List<User> users = userRepository.findAll();

    List<Map<String, Object>> result = users.stream()
            .map(user -> {
                Map<String, Object> map = new java.util.HashMap<String, Object>();

                map.put("id", user.getId());
                map.put("name", user.getName());
                map.put("email", user.getEmail());
                map.put("role", user.getRole().name());
                map.put("active", user.isActive());
                map.put("studentId", user.getStudentId());
                map.put("staffId", user.getStaffId());
                map.put("createdAt", user.getCreatedAt());

                return map;
            })
            .collect(Collectors.toList());

    return ResponseEntity.ok(result);
}

    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
    long totalStudents = userRepository.countByRole(com.miraiacademy.lms.entity.Role.STUDENT);
    long totalStaff = userRepository.countByRole(com.miraiacademy.lms.entity.Role.STAFF);
    long totalAdmins = userRepository.countByRole(com.miraiacademy.lms.entity.Role.ADMIN);
    long totalCourses = courseRepository.count();
    long totalEnrollments = enrollmentRepository.count();

    // Monthly revenue: sum of paidAmount for enrollments in current month
    java.time.YearMonth now = java.time.YearMonth.now();
    java.math.BigDecimal monthlyRevenue = enrollmentRepository.findAll().stream()
        .filter(e -> e.getEnrollmentDate() != null && java.time.YearMonth.from(e.getEnrollmentDate()).equals(now))
        .map(Enrollment::getPaidAmount)
        .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

    long pendingPayments = enrollmentRepository.findByPaymentStatus(PaymentStatus.PENDING).size()
        + enrollmentRepository.findByPaymentStatus(PaymentStatus.PARTIAL).size();

    long activeCourses = courseRepository.findByActiveTrue().size();

    // Recent activities: recent enrollments (latest 5)
    java.util.List<Map<String, Object>> recentActivities = enrollmentRepository.findAll().stream()
        .sorted((a, b) -> b.getEnrollmentDate().compareTo(a.getEnrollmentDate()))
        .limit(5)
        .map(en -> {
            Map<String, Object> activity = new java.util.HashMap<>();
            activity.put("student", en.getStudent() != null ? en.getStudent().getName() : "-");
            activity.put("course", en.getCourse() != null ? en.getCourse().getName() : "-");
            activity.put("date", en.getEnrollmentDate());
            activity.put("paidAmount", en.getPaidAmount());
            activity.put("status", en.getPaymentStatus().name());
            return activity;
        })
        .collect(java.util.stream.Collectors.toList());

    Map<String, Object> stats = new java.util.HashMap<>();
    stats.put("totalStudents", totalStudents);
    stats.put("totalStaff", totalStaff);
    stats.put("totalAdmins", totalAdmins);
    stats.put("totalCourses", totalCourses);
    stats.put("totalEnrollments", totalEnrollments);
    stats.put("monthlyRevenue", monthlyRevenue);
    stats.put("pendingPayments", pendingPayments);
    stats.put("activeCourses", activeCourses);
    stats.put("recentActivities", recentActivities);

    // Online counts in the last 15 minutes
    java.time.LocalDateTime since = java.time.LocalDateTime.now().minusMinutes(15);
    Map<String, Long> onlineByRole = new java.util.HashMap<>();
    onlineByRole.put("admin", userRepository.countByRoleAndLastLoginAtAfter(com.miraiacademy.lms.entity.Role.ADMIN, since));
    onlineByRole.put("staff", userRepository.countByRoleAndLastLoginAtAfter(com.miraiacademy.lms.entity.Role.STAFF, since));
    onlineByRole.put("student", userRepository.countByRoleAndLastLoginAtAfter(com.miraiacademy.lms.entity.Role.STUDENT, since));
    stats.put("onlineByRole", onlineByRole);
    stats.put("activeSince", since.toString());

    return ResponseEntity.ok(stats);
    }
}
