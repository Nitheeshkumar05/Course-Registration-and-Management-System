package com.example.Course.Registration.System.service;

import com.example.Course.Registration.System.model.Course;
import com.example.Course.Registration.System.model.CourseRegistry;
import com.example.Course.Registration.System.model.User;
import com.example.Course.Registration.System.repository.CourseRegistryRepo;
import com.example.Course.Registration.System.repository.CourseRepo;
import com.example.Course.Registration.System.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepo courseRepo;
    private final CourseRegistryRepo courseRegistryRepo;
    private final UserRepository userRepository;

    public CourseService(CourseRepo courseRepo, CourseRegistryRepo courseRegistryRepo, UserRepository userRepository) {
        this.courseRepo = courseRepo;
        this.courseRegistryRepo = courseRegistryRepo;
        this.userRepository = userRepository;
    }

    public List<Course> availableCourses() { return courseRepo.findAll(); }
    public List<CourseRegistry> enrolledStudents() { return courseRegistryRepo.findAll(); }

    public List<CourseRegistry> myCourses(String email) { return courseRegistryRepo.findByEmailId(email); }

    public void enrollCourse(String email, String courseName) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found."));
        if (courseRepo.findByCourseName(courseName).isEmpty()) throw new IllegalArgumentException("Course not found.");
        if (courseRegistryRepo.existsByEmailIdAndCourseName(email, courseName)) throw new IllegalArgumentException("You are already registered for this course.");
        courseRegistryRepo.save(new CourseRegistry(user.getName(), user.getEmail(), courseName));
    }

    public Course addCourse(Course course) { return courseRepo.save(course); }

    public void deleteCourse(String courseId) {
        if (!courseRepo.existsById(courseId)) throw new IllegalArgumentException("Course not found.");
        courseRepo.deleteById(courseId);
    }
}
