package com.miraiacademy.lms.controller;

import com.miraiacademy.lms.entity.Course;
import com.miraiacademy.lms.repository.CourseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String level) {
        
        List<Course> courses;
        if (category != null) {
            courses = courseRepository.findByCategoryAndActiveTrue(category);
        } else {
            courses = courseRepository.findByActiveTrue();
        }
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        course.setActive(true);
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        return courseRepository.findById(id)
                .map(course -> {
                    course.setName(courseDetails.getName());
                    course.setDescription(courseDetails.getDescription());
                    course.setCategory(courseDetails.getCategory());
                    course.setSubCategory(courseDetails.getSubCategory());
                    course.setLevel(courseDetails.getLevel());
                    course.setDurationWeeks(courseDetails.getDurationWeeks());
                    course.setPrice(courseDetails.getPrice());
                    course.setImageUrl(courseDetails.getImageUrl());
                    return ResponseEntity.ok(courseRepository.save(course));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(course -> {
                    course.setActive(false);
                    courseRepository.save(course);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}