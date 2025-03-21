# Barber Shop Appointment Scheduling App

This project is a full-stack application for managing barber shop appointments, built with Java and Angular. It provides a comprehensive solution for managing clients, schedules, and appointments.

## Overview

The application consists of two main parts:

- **Frontend:** An Angular-based user interface for managing clients and scheduling appointments.
- **Backend:** A Java-based RESTful API for managing data and handling business logic.

## Frontend

The frontend is built using Angular and provides a user-friendly interface for interacting with the backend API.

### Key Features

- Client management (add, edit, delete).
- Appointment scheduling.
- Calendar view for appointments.
- Responsive design.

### Technologies

- Angular (>=17)
- Node.js (>=18)
- npm (>=8) or Yarn (>=1.22)
- Angular CLI (>=17)

### Directory Structure

```
📂 barber-shop-ui/
├── 📂 src/                           # Source code
│   ├── 📂 app/                       # Application modules
│   │   ├── 📂 clients/               # Client management module
│   │   ├── 📂 schedules/             # Schedule management module
│   │   ├── 📂 commons/               # Common components
│   │   ├── 📂 services/              # Services
│   ├── 📂 environments/              # Environment configurations
│   ├── 📄 index.html                 # Main HTML file
│   ├── 📄 main.ts                    # Entry point
│   ├── 📄 styles.scss                # Global styles
├── 📄 angular.json                   # Angular CLI configuration
├── 📄 package.json                   # Dependencies and scripts
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 README.md                      # Project documentation
```

### Architecture

- **Component-Based:** The UI is built using reusable Angular components.
- **Services:** Services handle business logic, data fetching, and state management.
- **Modules:** Feature modules encapsulate related components, services, and routes.
- **API Client:** Dedicated services handle communication with the backend API.

## Backend

The backend is built using Java with Spring Boot and provides a RESTful API for managing clients and schedules.

### Key Features

- RESTful API for client and schedule management.
- Data persistence using PostgreSQL.
- Database migrations using Flyway.
- Exception handling.

### Technologies

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Flyway
- MapStruct
- Lombok
- Docker
- Gradle

### Directory Structure

```
📂barber-shop-api/
├── 📂src/
│   ├── 📂main/
│   │   ├── 📂java/
│   │   │   └── 📂br/
│   │   │       └── 📂com/
│   │   │           └── 📂dio/
│   │   │               └── 📂barbershopapi/
│   │   │                   ├── Application.java
│   │   │                   ├── 📂config/
│   │   │                   ├── 📂controller/
│   │   │                   ├── 📂entity/
│   │   │                   ├── 📂repository/
│   │   │                   ├── 📂service/
│   │   └── 📂resources/
│   │       ├── application.yml
│   │       └── 📂db/
│   │           └── 📂migration/
```

### Architecture

- **RESTful API:** Designed as a RESTful API using Spring Boot.
- **Layered Architecture:** Separates concerns into distinct layers (Controller, Service, Repository, Entity).

## Getting Started

1.  Clone the repository.
2.  Follow the instructions in the `barber-shop-ui/README.md` and `barber-shop-api/README.md` files to set up the frontend and backend, respectively.
3.  Start the backend server.
4.  Start the frontend development server.
5.  Access the application in your browser.

## Additional Resources

Refer to the individual README files in the `barber-shop-ui` and `barber-shop-api` directories for more detailed information on each part of the application.
