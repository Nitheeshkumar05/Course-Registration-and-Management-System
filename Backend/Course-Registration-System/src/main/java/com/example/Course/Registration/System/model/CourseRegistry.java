package com.example.Course.Registration.System.model;

import jakarta.persistence.*;

@Entity
public class CourseRegistry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String name;
    private String emailId;
    private String courseName;

    public CourseRegistry() {}
    public CourseRegistry(String name, String emailId, String courseName) {
        this.courseName = courseName;
        this.emailId = emailId;
        this.name = name;
    }
    public int getID() { return ID; }
    public void setID(int ID) { this.ID = ID; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
}
