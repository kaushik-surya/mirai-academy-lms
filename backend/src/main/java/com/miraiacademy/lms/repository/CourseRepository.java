package com.miraiacademy.lms.repository;

import com.miraiacademy.lms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByActiveTrue();

    List<Course> findByCategory(String category);

    List<Course> findByCategoryAndActiveTrue(String category);

    List<Course> findByLevel(String level);

    List<Course> findBySubCategory(String subCategory);
}