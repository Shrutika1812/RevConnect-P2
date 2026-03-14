<<<<<<< HEAD
# RevConnect - Social Media Platform

A full-stack social media web application built with Spring Boot, Angular, and MySQL that enables personal users, businesses, and content creators to connect, share content, and build their professional network.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🌟 Overview

RevConnect is a LinkedIn-inspired social networking platform that provides:

- **Personal User Accounts**: Create profiles, share posts, connect with others
- **Business Accounts**: Enhanced profiles with business information, analytics, and promotional features
- **Creator Accounts**: Content creation tools with engagement metrics and scheduling capabilities
- **Social Features**: Posts, likes, comments, reposts, connections, and follows
- **Real-time Notifications**: Stay updated with connection requests, likes, comments, and more
- **Privacy Controls**: Manage profile visibility and notification preferences

## ✨ Features

### For All Users
- User authentication (register, login, password recovery)
- Profile management (bio, profile picture, location, website)
- Create, edit, and delete posts with hashtags
- Like, comment, and repost content
- Personalized feed from connections and followed accounts
- Search users and posts
- Real-time notifications
- Privacy settings

### For Business/Creator Accounts
- Enhanced profile with business details
- Business hours and location
- Multiple external links
- Product/service showcase
- Post scheduling
- Pin important posts
- Analytics dashboard (post views, engagement metrics, follower demographics)
- Call-to-action buttons on posts

## 🛠 Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.3
- **Language**: Java 17
- **Database**: MySQL
- **Security**: Spring Security + JWT Authentication
- **ORM**: Spring Data JPA (Hibernate)
- **Build Tool**: Maven

### Frontend
- **Framework**: Angular 21.1.0
- **Language**: TypeScript 5.9.2
- **Styling**: Bootstrap 5.3.8
- **Icons**: Font Awesome 7.2.0
- **HTTP Client**: Angular HttpClient
- **State Management**: RxJS 7.8.0

## 📁 Project Structure

```
revconnect/
├── src/main/java/com/revconnect/revconnect/    # Backend source code
│   ├── config/                                  # Configuration classes
│   ├── controller/                              # REST API controllers
│   ├── dto/                                     # Data Transfer Objects
│   ├── entity/                                  # JPA entities
│   ├── repository/                              # Data repositories
│   ├── security/                                # Security configuration
│   └── service/                                 # Business logic
├── src/main/resources/                          # Application properties
├── revconnect-frontend/                         # Frontend application
│   └── src/app/
│       ├── components/                          # Angular components
│       ├── services/                            # API services
│       └── guards/                              # Route guards
└── pom.xml                                      # Maven dependencies
```

## 📋 Prerequisites

Before running this application, ensure you have:

- **Java Development Kit (JDK) 17** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+**
- **Maven 3.6+** (or use included Maven wrapper)
- **Angular CLI 21+** (optional, for development)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd revconnect
```

### 2. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE revconnect_db;
```

Update database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/revconnect_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Backend Setup

Install dependencies and build:

```bash
# Using Maven wrapper (recommended)
./mvnw clean install

# Or using Maven
mvn clean install
```

### 4. Frontend Setup

Navigate to frontend directory and install dependencies:

```bash
cd revconnect-frontend
npm install
```

## ▶️ Running the Application

### Start Backend Server

From the root directory:

```bash
# Using Maven wrapper
./mvnw spring-boot:run

# Or using Maven
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

### Start Frontend Development Server

From the `revconnect-frontend` directory:

```bash
npm start
# or
ng serve
```

Frontend will run on: `http://localhost:4200`

### Access the Application

Open your browser and navigate to: `http://localhost:4200`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Main Endpoints

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Password recovery

#### User & Profile
- `GET /users/me` - Get current user
- `GET /users/search` - Search users
- `GET /profile` - Get user profile
- `PUT /profile` - Update profile

#### Posts
- `GET /posts/feed` - Get personalized feed
- `POST /posts` - Create post
- `PUT /posts/{id}` - Update post
- `DELETE /posts/{id}` - Delete post

#### Social Interactions
- `POST /likes/{postId}` - Like post
- `DELETE /likes/{postId}` - Unlike post
- `POST /comments` - Add comment
- `POST /reposts/{postId}` - Repost content

#### Network
- `POST /connections/request/{userId}` - Send connection request
- `PUT /connections/accept/{requestId}` - Accept connection
- `POST /follows/{userId}` - Follow user
- `DELETE /follows/{userId}` - Unfollow user

#### Notifications
- `GET /notifications` - Get notifications
- `PUT /notifications/{id}/read` - Mark as read

#### Business Features
- `POST /business-profile` - Create business profile
- `GET /analytics` - Get analytics data
- `POST /scheduled-posts` - Schedule post

For detailed API documentation, see [Backend README](src/main/java/com/revconnect/revconnect/README.md)

## 🧪 Testing

### Backend Tests
```bash
./mvnw test
```

### Frontend Tests
```bash
cd revconnect-frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of an academic assignment.

## 👥 Authors

Developed as part of P2 - RevConnect Project

## 🙏 Acknowledgments

- Spring Boot Documentation
- Angular Documentation
- Bootstrap Documentation
- Font Awesome Icons

---

For more detailed information:
- [Backend Documentation](src/main/java/com/revconnect/revconnect/README.md)
- [Frontend Documentation](revconnect-frontend/README.md)
=======
# RevConnect-P2
>>>>>>> b038abb31b68371749bfe8c49272a569978f348a
