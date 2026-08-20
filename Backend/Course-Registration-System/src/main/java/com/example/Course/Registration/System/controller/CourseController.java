package com.example.Course.Registration.System.controller;

import com.example.Course.Registration.System.model.Course;
import com.example.Course.Registration.System.model.CourseRegistry;
import com.example.Course.Registration.System.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/")
    public String home() { return "Course Registration Backend is running"; }

    @GetMapping("/courses")
    public List<Course> availableCourses() { return courseService.availableCourses(); }

    @GetMapping("/courses/enrolled")
    public List<CourseRegistry> enrolledStudents() { return courseService.enrolledStudents(); }

    @GetMapping("/courses/my-courses")
    public List<CourseRegistry> myCourses(Authentication authentication) {
        return courseService.myCourses(authentication.getName());
    }

    @PostMapping("/courses/register")
    public ResponseEntity<String> enrollCourse(@RequestParam("courseName") String courseName,
                                               Authentication authentication) {
        try {
            courseService.enrollCourse(authentication.getName(), courseName);
            return ResponseEntity.ok("Course enrollment successful.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/courses/admin")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        if (course.getCourseId() == null || course.getCourseId().isBlank() || course.getCourseName() == null || course.getCourseName().isBlank()) {
            return ResponseEntity.badRequest().body("Course ID and course name are required.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.addCourse(course));
    }

    @DeleteMapping("/courses/admin/{courseId}")
    public ResponseEntity<String> deleteCourse(@PathVariable String courseId) {
        try {
            courseService.deleteCourse(courseId);
            return ResponseEntity.ok("Course deleted successfully.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
