package com.example.Course.Registration.System.repository;

import com.example.Course.Registration.System.model.CourseRegistry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRegistryRepo extends JpaRepository<CourseRegistry, Integer> {
    List<CourseRegistry> findByEmailId(String emailId);
    boolean existsByEmailIdAndCourseName(String emailId, String courseName);
}
