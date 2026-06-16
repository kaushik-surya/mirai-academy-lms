package com.miraiacademy.lms.repository;

import com.miraiacademy.lms.entity.Batch;
import com.miraiacademy.lms.entity.Batch.BatchStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    List<Batch> findByCourseId(Long courseId);

    List<Batch> findByInstructorId(Long instructorId);

    List<Batch> findByStatus(BatchStatus status);

    List<Batch> findByStartDateBetween(LocalDate start, LocalDate end);

    List<Batch> findByCourseIdAndStatus(Long courseId, BatchStatus status);
}