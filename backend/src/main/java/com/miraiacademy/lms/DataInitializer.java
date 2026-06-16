package com.miraiacademy.lms;

import com.miraiacademy.lms.entity.*;
import com.miraiacademy.lms.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final BatchRepository batchRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                          CourseRepository courseRepository,
                          BatchRepository batchRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.batchRepository = batchRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create Admin
        User admin = new User();
        admin.setEmail("admin@miraiacademy.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setName("Admin User");
        admin.setRole(Role.ADMIN);
        admin.setActive(true);
        admin.setCreatedAt(LocalDateTime.now());
        admin.setPhone("+81-90-1234-5678");
        userRepository.save(admin);

        // Create Staff/Instructor
        User instructor = new User();
        instructor.setEmail("teacher@miraiacademy.com");
        instructor.setPassword(passwordEncoder.encode("teacher123"));
        instructor.setName("Tanaka Sensei");
        instructor.setRole(Role.STAFF);
        instructor.setActive(true);
        instructor.setCreatedAt(LocalDateTime.now());
        instructor.setPhone("+81-90-8765-4321");
        instructor.setSpecialization("Japanese Language");
        instructor.setStaffId("STF001");
        instructor.setJoiningDate(LocalDateTime.now());
        instructor.setSalary(500000.0);
        userRepository.save(instructor);

        // Create Student
        User student = new User();
        student.setEmail("student@miraiacademy.com");
        student.setPassword(passwordEncoder.encode("student123"));
        student.setName("John Doe");
        student.setRole(Role.STUDENT);
        student.setActive(true);
        student.setCreatedAt(LocalDateTime.now());
        student.setPhone("+81-80-1111-2222");
        student.setStudentId("STU001");
        student.setEnrollmentDate(LocalDateTime.now());
        userRepository.save(student);

        // Create Courses
        Course japaneseN5 = new Course();
        japaneseN5.setName("Japanese N5");
        japaneseN5.setDescription("Beginner Japanese course covering hiragana, kataana, basic grammar and vocabulary for JLPT N5.");
        japaneseN5.setCategory("Japanese");
        japaneseN5.setSubCategory("N5");
        japaneseN5.setLevel("Beginner");
        japaneseN5.setDurationWeeks(12);
        japaneseN5.setPrice(new BigDecimal("299.00"));
        japaneseN5.setActive(true);
        japaneseN5.setCreatedAt(LocalDateTime.now());
        courseRepository.save(japaneseN5);

        Course javaProgramming = new Course();
        javaProgramming.setName("Java Programming");
        javaProgramming.setDescription("Comprehensive Java programming course from basics to advanced concepts including Spring Boot.");
        javaProgramming.setCategory("Programming");
        javaProgramming.setSubCategory("Java");
        javaProgramming.setLevel("All Levels");
        javaProgramming.setDurationWeeks(16);
        javaProgramming.setPrice(new BigDecimal("399.00"));
        javaProgramming.setActive(true);
        javaProgramming.setCreatedAt(LocalDateTime.now());
        courseRepository.save(javaProgramming);

        Course pythonCourse = new Course();
        pythonCourse.setName("Python & Data Science");
        pythonCourse.setDescription("Learn Python programming and data science fundamentals including pandas, numpy, and machine learning basics.");
        pythonCourse.setCategory("Programming");
        pythonCourse.setSubCategory("Python");
        pythonCourse.setLevel("Beginner to Intermediate");
        pythonCourse.setDurationWeeks(14);
        pythonCourse.setPrice(new BigDecimal("349.00"));
        pythonCourse.setActive(true);
        pythonCourse.setCreatedAt(LocalDateTime.now());
        courseRepository.save(pythonCourse);

        // Create Batch
        Batch batch = new Batch();
        batch.setName("Japanese N5 Weekend Batch - June 2024");
        batch.setCourse(japaneseN5);
        batch.setInstructor(instructor);
        batch.setStartDate(LocalDate.of(2024, 6, 15));
        batch.setEndDate(LocalDate.of(2024, 9, 15));
        batch.setScheduleType("Weekend");
        batch.setScheduleDays("Sat,Sun");
        batch.setTimeSlot("10:00 AM - 12:00 PM");
        batch.setMaxStudents(20);
        batch.setEnrolledStudents(0);
        batch.setMeetingLink("https://zoom.us/j/123456789");
        batch.setStatus(Batch.BatchStatus.UPCOMING);
        batch.setCreatedAt(LocalDateTime.now());
        batchRepository.save(batch);

        System.out.println("=== Data Initialization Complete ===");
        System.out.println("Admin: admin@miraiacademy.com / admin123");
        System.out.println("Teacher: teacher@miraiacademy.com / teacher123");
        System.out.println("Student: student@miraiacademy.com / student123");
    }
}