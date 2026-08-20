# Course Registration System

Full-stack course registration application built with Spring Boot, Spring Security, MySQL and React.

## Features

- Student registration and login
- BCrypt password hashing
- Multiple student accounts stored in MySQL
- Role-based authorization with `STUDENT` and `ADMIN`
- Session-based Spring Security authentication
- Students can browse and register for courses
- Students can view their own registrations
- Admin can view all student enrollments
- Admin can add and delete courses
- Modern responsive React interface

## Default Admin

The application creates this admin account automatically on first startup if it does not already exist:

- Email: `admin@course.com`
- Password: `admin123`

Public registration always creates a `STUDENT` account. Users cannot select the ADMIN role from the registration page.

## Database

Create the MySQL database first:

```sql
CREATE DATABASE course_reg_sym;
```

The default database credentials are `root` / `root`. You can override them with environment variables:

```text
DB_USERNAME
DB_PASSWORD
```

## Backend

Open `Backend/Course-Registration-System` in IntelliJ IDEA or Eclipse and run the Spring Boot application.

Important Spring Security classes:

- `SecurityConfig` - security rules, BCrypt, authentication manager and session configuration
- `CustomUserDetailsService` - loads users from MySQL
- `AuthController` - registration, login, current user and logout
- `User` / `Role` - user account and role model
- `UserRepository` - database access for users

## Frontend

Open `Frontend` in a terminal:

```bash
npm install
npm run dev
```

The React application expects Spring Boot at `http://localhost:8080` and Vite at `http://localhost:5173`.

## Security flow

```text
Register -> BCrypt password hash -> MySQL

Login -> AuthenticationManager -> UserDetailsService -> MySQL
      -> BCrypt verification -> SecurityContext -> HTTP session

Request -> Spring Security -> role authorization -> controller
```

CSRF is disabled for this small local REST/session demo to keep the security setup simple. For a production application, CSRF protection and HTTPS should be enabled.
