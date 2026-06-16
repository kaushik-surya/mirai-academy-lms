package com.miraiacademy.lms.repository;

import com.miraiacademy.lms.entity.User;
import com.miraiacademy.lms.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);

    long countByRoleAndLastLoginAtAfter(Role role, LocalDateTime after);

    List<User> findByRole(Role role);

    List<User> findByActiveTrue();

    List<User> findByRoleAndActiveTrue(Role role);

    Optional<User> findByStudentId(String studentId);

    Optional<User> findByStaffId(String staffId);
}