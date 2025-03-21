# Barber Shop UI - Angular Frontend

This project is the Angular-based frontend for a Barber Shop appointment scheduling application. It provides a user interface for managing clients and scheduling appointments.

## Table of Contents

- [Barber Shop UI - Angular Frontend](#barber-shop-ui---angular-frontend)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Code Scaffolding](#code-scaffolding)
  - [Building](#building)
  - [Running Unit Tests](#running-unit-tests)
  - [Directory Structure](#directory-structure)
  - [Software Architecture](#software-architecture)
  - [Design Patterns](#design-patterns)
  - [Additional Resources](#additional-resources)

## Prerequisites

- [Node.js](https://nodejs.org/) (>=18)
- [npm](https://www.npmjs.com/) (>=8) or [Yarn](https://yarnpkg.com/) (>=1.22)
- [Angular CLI](https://angular.io/cli) (>=17)

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd barber-shop-ui
```

Install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, service, etc., run:

```bash
ng generate component component-name
```

For a complete list of available schematics, run:

```bash
ng generate --help
```

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. Use the `--configuration production` flag for a production build:

```bash
ng build --configuration production
```

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Directory Structure

Here's a simplified overview of the project's directory structure:

```
📂 barber-shop-ui/
├── 📂 .angular/                      # Angular CLI cache
├── 📂 .vscode/                       # VS Code configuration files
├── 📂 src/                           # Source code
│   ├── 📂 app/                       # Application modules
│   │   ├── 📂 clients/               # Client management module
│   │   │   ├── 📂 components/        # Client components
│   │   │   │   ├── 📂 client-form/   # Client form component
│   │   │   │   ├── 📂 client-table/  # Client table component
│   │   │   ├── 📄 client.model.ts    # Client data models
│   │   │   ├── 📄 ...                # Other client-related files
│   │   ├── 📂 schedules/             # Schedule management module
│   │   │   ├── 📂 components/        # Schedule components
│   │   │   │   ├── 📂 schedule-calendar/ # Schedule calendar component
│   │   │   ├── 📄 schedule.model.ts  # Schedule data models
│   │   │   ├── 📄 ...                # Other schedule-related files
│   │   ├── 📂 commons/               # Common components
│   │   │   ├── 📂 components/        # Reusable components
│   │   │   │   ├── 📄 card-header/    # Card header component
│   │   │   │   ├── 📄 menu-bar/       # Menu bar component
│   │   │   │   ├── 📄 ...            # Other common components
│   │   ├── 📂 services/              # Services
│   │   │   ├── 📂 api-client/         # API client services
│   │   │   │   ├── 📂 clients/       # Client API service
│   │   │   │   ├── 📂 schedules/     # Schedule API service
│   │   ├── 📄 app.component.ts       # Root component
│   │   ├── 📄 app.module.ts          # Root module
│   │   ├── 📄 app.routing.ts         # Application routes
│   ├── 📂 environments/              # Environment configurations
│   ├── 📄 index.html                 # Main HTML file
│   ├── 📄 main.ts                    # Entry point
│   ├── 📄 styles.scss                # Global styles
├── 📄 angular.json                   # Angular CLI configuration
├── 📄 package.json                   # Dependencies and scripts
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 README.md                      # Project documentation
```

## Software Architecture

The frontend architecture follows a modular structure based on Angular best practices:

- **Component-Based:** The UI is built using reusable Angular components.
- **Services:** Services are used to handle business logic, data fetching, and state management.
- **Modules:** Feature modules (e.g., `ClientsModule`, `SchedulesModule`) encapsulate related components, services, and routes.
- **API Client:** Dedicated services (`ClientsService`, `SchedulesService`) handle communication with the backend API.

## Design Patterns

The following design patterns are used in the project:

- **Component:** The entire application is structured around Angular components, promoting reusability and maintainability.
- **Dependency Injection:** Angular's dependency injection is used extensively to provide services and dependencies to components and other services.
- **Singleton:** Services like `SnackbarManagerService` and `DialogManagerService` are implemented as singletons to provide global access to specific functionalities.
- **Observable:** RxJS Observables are used for handling asynchronous operations, such as API calls and event handling.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
