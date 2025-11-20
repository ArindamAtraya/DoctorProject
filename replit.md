# HealthConnect - Doctor Appointment System

## Overview
HealthConnect is a comprehensive doctor appointment booking system that connects patients with healthcare providers. The application allows users to find doctors, book appointments, and manage healthcare services.

## Project Structure
- **backend/**: Node.js/Express backend server
  - **server.js**: Main server file with all routes and business logic
  - **package.json**: Node.js dependencies
  - **models/**, **routes/**, **middleware/**: Application components
- **frontend/**: Static HTML/CSS/JavaScript files
  - Multiple HTML pages for different user dashboards
  - Responsive design with modern UI

## Technology Stack
- **Backend**: Node.js, Express.js
- **Authentication**: JWT tokens, bcrypt for password hashing
- **Database**: In-memory storage (demo purposes)
- **Frontend**: Vanilla HTML, CSS, JavaScript

## Key Features
- Patient registration and login
- Healthcare provider registration (pharmacy, clinic, hospital)
- Doctor search and filtering
- Appointment booking
- Multiple user roles: patient, doctor, pharmacy, clinic, hospital
- Medical records management
- Review and rating system

## Recent Changes (Nov 20, 2025)
- Imported from GitHub and configured for Replit environment
- **Migrated to MongoDB** - Complete database integration with MongoDB Atlas
- **Enhanced Provider Dashboard** - Full doctor management system with:
  - Photo upload capability
  - Multiple degrees/qualifications tracking
  - Consultation fees and experience management
  - Available slots per day configuration
- **Advanced Booking System**:
  - Automatic queue number assignment
  - Payment tracking (amount paid, balance, payment status)
  - Appointment status management (pending, confirmed, completed, cancelled)
- **Homepage Integration** - Doctors display from database with booking capability
- **Device Responsive** - All pages optimized for mobile, tablet, and desktop
- Updated server to bind to 0.0.0.0:5000 for frontend access
- Set up proper .gitignore for Node.js

## Demo Credentials
- **Patient**: john@example.com / password123
- **Pharmacy**: pharmacy@demo.com / password123
- **Clinic**: clinic@demo.com / password123
- **Hospital**: hospital@demo.com / password123

## Running the Application
The server runs on port 5000 and serves both the API and frontend static files.
