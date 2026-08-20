package com.example.Course.Registration.System;

import com.example.Course.Registration.System.model.Course;
import com.example.Course.Registration.System.model.Role;
import com.example.Course.Registration.System.model.User;
import com.example.Course.Registration.System.repository.CourseRepo;
import com.example.Course.Registration.System.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CourseRegistrationSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(CourseRegistrationSystemApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(UserRepository userRepository, CourseRepo courseRepo, PasswordEncoder encoder) {
        return args -> {
            if (!userRepository.existsByEmail("admin@course.com")) {
                userRepository.save(new User("System Admin", "admin@course.com", encoder.encode("admin123"), Role.ADMIN));
            }
            if (courseRepo.count() == 0) {
                courseRepo.save(new Course("JAVA101", "Java Essentials", "Arun Kumar", 8));
                courseRepo.save(new Course("PY101", "Python for ML", "Priya Sharma", 10));
                courseRepo.save(new Course("SB101", "Spring Boot", "Vijay Kumar", 6));
            }
        };
    }
}
