# Appointment Management System

A full-stack application for managing appointments between clients and service providers.

## Features

- User roles: Admin, Staff, and Client
- Appointment booking, management, and tracking
- Service catalog
- JWT Authentication
- Responsive UI

## Tech Stack

### Backend
- Django (Python web framework)
- Django REST Framework (API)
- MySQL (Database)
- JWT Authentication

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios (API client)
- React Router (Navigation)

## Project Structure

```
appointment/
├── backend/               # Django backend
│   ├── appointment_system/  # Main Django project
│   ├── users/             # User management app
│   ├── appointments/      # Appointments and services app
│   └── ...
└── frontend/             # React frontend
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Page components
    │   ├── services/     # API services
    │   ├── types/        # TypeScript interfaces
    │   ├── utils/        # Utility functions
    │   └── ...
    └── ...
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create MySQL database:
   ```
   CREATE DATABASE appointment_db;
   ```

5. Apply migrations:
   ```
   python manage.py migrate
   ```

6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/token/ - Get JWT token
- POST /api/auth/token/refresh/ - Refresh JWT token
- GET /api/auth/me/ - Get current user

### Appointments
- GET /api/appointments/ - List appointments
- POST /api/appointments/ - Create appointment
- GET /api/appointments/:id/ - Get appointment
- PUT /api/appointments/:id/ - Update appointment
- DELETE /api/appointments/:id/ - Delete appointment

### Services
- GET /api/services/ - List services
- POST /api/services/ - Create service
- GET /api/services/:id/ - Get service
- PUT /api/services/:id/ - Update service
- DELETE /api/services/:id/ - Delete service
