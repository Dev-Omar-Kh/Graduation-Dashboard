# Graduation Project Dashboard

## Overview
The **Graduation Project Dashboard** is a web-based application designed to manage and monitor various aspects of graduation projects. It provides a user-friendly interface with role-based access for administrators, officers, and other stakeholders.

## Features
### Routing System
- **React Router**: Implements a nested routing structure for seamless navigation.
- **Main Routes**:
  - `/`: Home page.
  - `/officers`: Manage officers with sub-routes for profiles, adding, and updating officers.
  - `/admins`: Manage admins with sub-routes for profiles, adding, and updating admins.
  - `/V-Management`: Manage violations with sub-routes for details, adding, and updating violations.
  - `/V-Reports`: Manage and view reports with sub-routes for report details.
  - `/adult-logs`: View audit logs.
  - `/login`: Login page for authentication.

### Layouts
- **MainLayout**: The primary layout for the application.
- **SubLayout**: Used for nested sections like Officers, Admins, Violations, and Reports.

### State Management
- **React Query**: Manages server state and API interactions efficiently.

### Internationalization (i18n)
- **Language Support**: Supports multiple languages with `react-i18next`.
- **RTL Support**: Automatically adjusts layout direction for right-to-left languages like Arabic.
- **Language Persistence**: Saves the selected language in `localStorage` for consistent user experience.

### Authentication
- **Login Page**: Provides a secure login mechanism for users.

### Styling
- **Tailwind CSS**: Used for rapid and responsive UI development.
- **Pure CSS**: Applied for custom styles and fine-tuning specific components.

### Dynamic Components
- Dynamically renders pages and components based on the route.

## Technologies Used
- **Frontend**:
  - React.js: For building reusable UI components.
  - React Router: For routing and navigation.
  - React Query: For state management and API integration.
  - React i18next: For internationalization and localization.
- **Styling**:
  - Tailwind CSS: For utility-first styling.
  - Pure CSS: For additional custom styles.

## How to Run the Project
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install` or `yarn install`.
4. Start the development server using `npm start` or `yarn start`.
5. Open your browser and access the application at `http://localhost:3000`.

## Folder Structure
- **Layouts**: Contains layout components like `MainLayout` and `SubLayout`.
- **Pages**: Contains page components for different sections (e.g., Home, Officers, Admins, Violations, Reports).
- **Authentication**: Contains components for user authentication (e.g., Login).
- **Actions**: Contains components for adding or updating data (e.g., AddOfficer, UpdateViolation).

## Contribution
We welcome contributions! Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the MIT License.

