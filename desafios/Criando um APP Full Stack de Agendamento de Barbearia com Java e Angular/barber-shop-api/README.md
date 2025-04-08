# Barber Shop API - Back-End Application

This project is a back-end application for scheduling appointments at a barber shop, built with Java.
It provides a RESTful API for managing clients and schedules.

## 📂 Directory Structure

```
📂barber-shop-api/
├── .gitattributes
├── .gitignore
├── build.gradle.kts
├── Dockerfile
├── 📂gradle/
│   └── 📂wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── README.md
├── settings.gradle.kts
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
│   │   │                   ├── 📂controller/request/
│   │   │                   ├── 📂controller/response/
│   │   │                   ├── 📂entity/
│   │   │                   ├── 📂exception/
│   │   │                   ├── 📂exceptionhandler/
│   │   │                   ├── 📂mapper/
│   │   │                   ├── 📂repository/
│   │   │                   ├── 📂service/
│   │   │                   └── 📂service/query/
│   │   └── 📂resources/
│   │       ├── application-dev.yml
│   │       ├── application.yml
│   │       └── 📂db/
│   │           └── 📂migration/
│   └── 📂test/
│       └── 📂java/
│           └── 📂br/
│               └── 📂com/
│                   └── 📂dio/
│                       └── 📂barbershopapi/
│                           └── ApplicationTests.java
├── start-dev.sh
└── docker-compose.yml
```

## Architectures

- **RESTful API:** The backend is designed as a RESTful API using Spring Boot, providing endpoints for managing clients and schedules.
- **Layered Architecture:** The project follows a layered architecture, separating concerns into distinct layers such as:
  - **Controller Layer:** Handles HTTP requests and responses.
  - **Service Layer:** Contains business logic.
  - **Repository Layer:** Manages data access using Spring Data JPA.
  - **Entity Layer:** Defines the data model.

## Design Patterns

- **Data Transfer Object (DTO):** Used in the controller layer to define request and response bodies, promoting data encapsulation and decoupling.
- **Repository Pattern:** Implemented using Spring Data JPA to abstract data access logic.
- **Service Layer:** Encapsulates business logic, promoting reusability and testability.
- **Mapper (MapStruct):** Used for mapping between entities and DTOs, reducing boilerplate code and improving maintainability.
- **Exception Handling:** Centralized exception handling using `@ControllerAdvice` to provide consistent error responses.
- **Configuration:** Uses Spring's `@Configuration` and `@Bean` annotations for dependency injection and configuration management.
- **CORS Configuration:** Configured using `CorsConfig` to allow cross-origin requests.

## Technologies

- **Java:** Programming language.
- **Spring Boot:** Framework for building Java-based web applications.
- **Spring Data JPA:** Simplifies database interactions.
- **PostgreSQL:** Relational database.
- **Flyway:** Database migration tool.
- **MapStruct:** Code generator for type-safe bean mappings.
- **Lombok:** Java library that reduces boilerplate code.
- **Docker:** Containerization platform.
- **Gradle:** Build automation tool.
- **Angular:** Front-end framework (assumed based on project description).

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Build the application:**

    ```bash
    ./gradlew build
    ```

3.  **Run the application using Docker Compose (recommended for development):**

    ```bash
    docker-compose up
    ```

    Alternatively, run the application using Gradle:

    ```bash
    ./gradlew bootRun
    ```

## Configuration

The application can be configured using the `application.yml` and `application-dev.yml` files. Key configurations include:

- Database connection details.
- Spring profiles.
- JPA settings.

## Database Migrations

Database migrations are managed using Flyway. Migration scripts are located in the `src/main/resources/db/migration` directory.

## API Endpoints

### Client Endpoints

- `/clients`: Manages client information.

### Schedule Endpoints

- **Create Schedule**

  - Endpoint: `POST /schedules`
  - Description: Creates a new appointment schedule
  - Request Body:
    ```json
    {
      "startAt": "2025-04-01T10:00:00Z",
      "endAt": "2025-04-01T11:00:00Z",
      "clientId": 1
    }
    ```
  - Response Body:
    ```json
    {
      "id": 1,
      "startAt": "2025-04-01T10:00:00Z",
      "endAt": "2025-04-01T11:00:00Z",
      "clientId": 1
    }
    ```
  - Status Codes:
    - 201: Schedule created successfully
    - 400: Invalid request (validation error)
    - 409: Schedule time slot already in use

- **Delete Schedule**

  - Endpoint: `DELETE /schedules/{id}`
  - Description: Deletes an existing schedule
  - Path Parameters:
    - `id`: The ID of the schedule to delete
  - Response: None (No Content)
  - Status Codes:
    - 204: Schedule deleted successfully
    - 404: Schedule not found

- **Get Schedules for Month**
  - Endpoint: `GET /schedules/{year}/{month}`
  - Description: Retrieves all schedules for a specific month
  - Path Parameters:
    - `year`: Year (e.g., 2025)
    - `month`: Month (1-12)
  - Response Body:
    ```json
    {
      "year": 2025,
      "month": 4,
      "scheduledAppointments": [
        {
          "id": 1,
          "day": 1,
          "startAt": "2025-04-01T10:00:00Z",
          "endAt": "2025-04-01T11:00:00Z",
          "clientId": 1,
          "clientName": "John Doe"
        },
        ...
      ]
    }
    ```
  - Status Codes:
    - 200: Request processed successfully
