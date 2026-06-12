# 🚗 Car Garage Booking System

A full-stack web application developed using the MERN Stack that allows users to book vehicle services online and enables administrators to manage bookings efficiently.

## 📌 Project Overview

The Car Garage Booking System is designed to simplify the traditional garage service booking process by providing an online platform where customers can schedule vehicle services, manage bookings, and track service status. The system also provides an admin panel for managing services, bookings, users, and reviews.

## ✨ Features

### User Features

* User Registration and Login
* Secure Authentication using JWT
* Forgot & Reset Password using Nodemailer
* Browse Available Garage Services
* Book Services with Date and Time Slot Selection
* View Booking History
* Edit and Delete Bookings
* Submit Service Reviews

### Admin Features

* Secure Admin Login
* View All Bookings
* Manage Service Records
* Update Booking Status
* Monitor Customer Activities
* Manage Reviews and Feedback

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JSX
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT (JSON Web Token)
* bcrypt.js

### Additional Tools

* Nodemailer
* Axios
* Postman
* GitHub

## 📂 Project Structure

```bash
Car-Garage-Booking-System/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Gagan-rao-44/car-garage-booking-system.git
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL=your_email_address
PASSWORD=your_email_password
```

### 5. Start Backend Server

```bash
npm start
```

### 6. Start Frontend Application

```bash
npm run dev
```

## 🔄 Application Workflow

1. User registers and logs into the system.
2. User selects a garage service.
3. User chooses preferred date and time slot.
4. Booking details are stored in MongoDB.
5. User can view bookings through the dashboard.
6. Admin manages and updates booking status.
7. Users can submit reviews after service completion.

## 🔐 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Environment Variable Configuration
* Password Reset via Email using Nodemailer

## 🚀 Future Enhancements

* Online Payment Gateway Integration
* Real-Time Slot Availability
* SMS/Email Notifications
* Mobile Application Support
* Multi-Language Support
* Location-Based Garage Search

## 👨‍💻 Developer

**Gagan **

Computer Science & Engineering

MERN Stack Developer

## 📄 License

This project is developed for educational and learning purposes.
