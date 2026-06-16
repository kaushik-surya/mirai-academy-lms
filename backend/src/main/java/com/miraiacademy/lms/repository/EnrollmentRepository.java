package com.miraiacademy.lms.repository;

import com.miraiacademy.lms.entity.Enrollment;
import com.miraiacademy.lms.entity.Enrollment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudentId(Long studentId);

    List<Enrollment> findByBatchId(Long batchId);

    List<Enrollment> findByCourseId(Long courseId);

    List<Enrollment> findByPaymentStatus(PaymentStatus status);

    Optional<Enrollment> findByStudentIdAndBatchId(Long studentId, Long batchId);

    boolean existsByStudentIdAndBatchId(Long studentId, Long batchId);

    List<Enrollment> findByStudentIdAndPaymentStatus(Long studentId, PaymentStatus status);
}