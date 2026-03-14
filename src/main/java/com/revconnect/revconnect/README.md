# RevConnect Backend - Spring Boot REST API

Complete backend implementation for the RevConnect social media platform using Spring Boot, Spring Security, and MySQL.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)

## 🏗 Architecture

The backend follows a layered architecture pattern:

```
Controller Layer → Service Layer → Repository Layer → Database
```

- **Controller**: Handles HTTP requests and responses
- **Service**: Contains business logic
- **Repository**: Data access layer using Spring Data JPA
- **Entity**: JPA entities mapped to database tables
- **DTO**: Data Transfer Objects for API communication
- **Security**: JWT-based authentication and authorization

## 🛠 Technologies

- **Spring Boot 4.0.3**: Main framework
- **Spring Security**: Authentication and authorization
- **Spring Data JPA**: Database operations
- **Hibernate**: ORM implementation
- **MySQL**: Relational database
- **JWT (JSON Web Tokens)**: Stateless authentication
- **Lombok**: Reduce boilerplate code
- **Maven**: Dependency management and build tool

## 📁 Project Structure

```
src/main/java/com/revconnect/revconnect/
├── config/
│   ├── CorsConfig.java                    # CORS configuration
│   └── SecurityConfig.java                # Security configuration
├── controller/
│   ├── AuthController.java                # Authentication endpoints
│   ├── UserController.java                # User management
│   ├── ProfileController.java             # Profile operations
│   ├── PostController.java                # Post CRUD operations
│   ├── LikeController.java                # Like functionality
│   ├── CommentController.java             # Comment operations
│   ├── RepostController.java              # Repost functionality
│   ├── ConnectionController.java          # Connection requests
│   ├── FollowController.java              # Follow/unfollow
│   ├── NotificationController.java        # Notifications
│   ├── BusinessProfileController.java     # Business profiles
│   ├── ScheduledPostController.java       # Post scheduling
│   └── SettingsController.java            # User settings
├── dto/
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── AuthResponse.java
│   ├── PostRequest.java
│   ├── CommentRequest.java
│   └── ... (other DTOs)
├── entity/
│   ├── User.java                          # User entity
│   ├── Profile.java                       # User profile
│   ├── Post.java                          # Post entity
│   ├── Like.java                          # Like entity
│   ├── Comment.java                       # Comment entity
│   ├── Repost.java                        # Repost entity
│   ├── Connection.java                    # Connection entity
│   ├── Follow.java                        # Follow entity
│   ├── Notification.java                  # Notification entity
│   ├── BusinessProfile.java               # Business profile
│   ├── ScheduledPost.java                 # Scheduled posts
│   ├── UserSettings.java                  # User preferences
│   ├── PostView.java                      # Post analytics
│   ├── PinnedPost.java                    # Pinned posts
│   ├── ProductService.java                # Business products
│   ├── ExternalLink.java                  # External links
│   ├── BusinessHours.java                 # Business hours
│   └── AccountType.java                   # Account type enum
├── repository/
│   ├── UserRepository.java
│   ├── ProfileRepository.java
│   ├── PostRepository.java
│   ├── LikeRepository.java
│   ├── CommentRepository.java
│   ├── RepostRepository.java
│   ├── ConnectionRepository.java
│   ├── FollowRepository.java
│   ├── NotificationRepository.java
│   └── ... (other repositories)
├── security/
│   ├── JwtAuthenticationFilter.java       # JWT filter
│   ├── JwtTokenProvider.java              # JWT utility
│   └── UserDetailsServiceImpl.java        # User details service
├── service/
│   ├── AuthService.java                   # Authentication logic
│   ├── UserService.java                   # User operations
│   ├── ProfileService.java                # Profile management
│   ├── PostService.java                   # Post operations
│   ├── LikeService.java                   # Like logic
│   ├── CommentService.java                # Comment logic
│   ├── RepostService.java                 # Repost logic
│   ├── ConnectionService.java             # Connection management
│   ├── FollowService.java                 # Follow logic
│   ├── NotificationService.java           # Notification handling
│   └── ... (other services)
└── RevconnectApplication.java             # Main application class
```

## 🗄 Database Schema

### Core Entities

#### User
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Encrypted)
- `accountType` (PERSONAL, BUSINESS, CREATOR)
- `createdAt`

#### Profile
- `id` (Primary Key)
- `userId` (Foreign Key)
- `name`
- `bio`
- `profilePicture`
- `location`
- `website`
- `isPrivate`

#### Post
- `id` (Primary Key)
- `userId` (Foreign Key)
- `content`
- `hashtags`
- `isPinned`
- `createdAt`
- `updatedAt`

#### Like
- `id` (Primary Key)
- `postId` (Foreign Key)
- `userId` (Foreign Key)
- `createdAt`

#### Comment
- `id` (Primary Key)
- `postId` (Foreign Key)
- `userId` (Foreign Key)
- `content`
- `createdAt`

#### Connection
- `id` (Primary Key)
- `senderId` (Foreign Key)
- `receiverId` (Foreign Key)
- `status` (PENDING, ACCEPTED, REJECTED)
- `createdAt`

#### Follow
- `id` (Primary Key)
- `followerId` (Foreign Key)
- `followingId` (Foreign Key)
- `createdAt`

#### Notification
- `id` (Primary Key)
- `userId` (Foreign Key)
- `type` (CONNECTION_REQUEST, LIKE, COMMENT, etc.)
- `content`
- `isRead`
- `createdAt`

#### BusinessProfile
- `id` (Primary Key)
- `userId` (Foreign Key)
- `businessName`
- `category`
- `description`
- `address`
- `contactInfo`

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/forgot-password` | Password recovery | No |
| POST | `/reset-password` | Reset password | No |

**Register Request:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "accountType": "PERSONAL"
}
```

**Login Request:**
```json
{
  "usernameOrEmail": "johndoe",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "johndoe",
  "accountType": "PERSONAL"
}
```

### User Management (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/me` | Get current user | Yes |
| GET | `/search?query={query}` | Search users | Yes |
| GET | `/{id}` | Get user by ID | Yes |

### Profile (`/api/profile`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get current user profile | Yes |
| GET | `/{userId}` | Get user profile by ID | Yes |
| PUT | `/` | Update profile | Yes |
| POST | `/picture` | Upload profile picture | Yes |

**Update Profile Request:**
```json
{
  "name": "John Doe",
  "bio": "Software Developer",
  "location": "New York, USA",
  "website": "https://johndoe.com",
  "isPrivate": false
}
```

### Posts (`/api/posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/feed` | Get personalized feed | Yes |
| GET | `/user/{userId}` | Get user's posts | Yes |
| GET | `/{id}` | Get post by ID | Yes |
| POST | `/` | Create new post | Yes |
| PUT | `/{id}` | Update post | Yes |
| DELETE | `/{id}` | Delete post | Yes |
| GET | `/trending` | Get trending posts | Yes |
| GET | `/search?query={query}` | Search posts | Yes |

**Create Post Request:**
```json
{
  "content": "This is my first post! #hello #world",
  "hashtags": ["hello", "world"]
}
```

### Likes (`/api/likes`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/{postId}` | Like a post | Yes |
| DELETE | `/{postId}` | Unlike a post | Yes |
| GET | `/post/{postId}` | Get post likes | Yes |

### Comments (`/api/comments`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Add comment | Yes |
| GET | `/post/{postId}` | Get post comments | Yes |
| DELETE | `/{id}` | Delete comment | Yes |

**Add Comment Request:**
```json
{
  "postId": 1,
  "content": "Great post!"
}
```

### Reposts (`/api/reposts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/{postId}` | Repost content | Yes |
| DELETE | `/{postId}` | Remove repost | Yes |

### Connections (`/api/connections`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/request/{userId}` | Send connection request | Yes |
| PUT | `/accept/{requestId}` | Accept request | Yes |
| PUT | `/reject/{requestId}` | Reject request | Yes |
| DELETE | `/{userId}` | Remove connection | Yes |
| GET | `/` | Get connections | Yes |
| GET | `/pending` | Get pending requests | Yes |

### Follows (`/api/follows`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/{userId}` | Follow user | Yes |
| DELETE | `/{userId}` | Unfollow user | Yes |
| GET | `/followers` | Get followers | Yes |
| GET | `/following` | Get following | Yes |

### Notifications (`/api/notifications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get notifications | Yes |
| GET | `/unread-count` | Get unread count | Yes |
| PUT | `/{id}/read` | Mark as read | Yes |
| PUT | `/read-all` | Mark all as read | Yes |

### Business Profile (`/api/business-profile`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create business profile | Yes |
| GET | `/` | Get business profile | Yes |
| PUT | `/` | Update business profile | Yes |
| POST | `/products` | Add product/service | Yes |
| POST | `/links` | Add external link | Yes |

### Scheduled Posts (`/api/scheduled-posts`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Schedule post | Yes |
| GET | `/` | Get scheduled posts | Yes |
| DELETE | `/{id}` | Cancel scheduled post | Yes |

### Analytics (`/api/analytics`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/post/{postId}` | Get post analytics | Yes |
| GET | `/overview` | Get account analytics | Yes |

### Settings (`/api/settings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user settings | Yes |
| PUT | `/` | Update settings | Yes |
| PUT | `/notifications` | Update notification preferences | Yes |

## 🔒 Security

### JWT Authentication

The application uses JWT (JSON Web Tokens) for stateless authentication:

1. User logs in with credentials
2. Server validates and returns JWT token
3. Client includes token in `Authorization` header for subsequent requests
4. Server validates token on each request

**Authorization Header Format:**
```
Authorization: Bearer <jwt-token>
```

### Password Security

- Passwords are encrypted using BCrypt
- Minimum password requirements enforced
- Password reset via email verification

### CORS Configuration

CORS is configured to allow requests from the Angular frontend:
- Allowed origins: `http://localhost:4200`
- Allowed methods: GET, POST, PUT, DELETE
- Credentials: Allowed

## ⚙️ Configuration

### Application Properties

Located at `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/revconnect_db
spring.datasource.username=root
spring.datasource.password=your_password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Port
server.port=8080

# JWT Configuration
jwt.secret=your_secret_key
jwt.expiration=86400000
```

### Environment Variables (Production)

For production, use environment variables:

```bash
export DB_URL=jdbc:mysql://production-host:3306/revconnect_db
export DB_USERNAME=prod_user
export DB_PASSWORD=secure_password
export JWT_SECRET=very_secure_secret_key
```

## ▶️ Running the Application

### Development Mode

```bash
# Using Maven wrapper
./mvnw spring-boot:run

# Or using Maven
mvn spring-boot:run
```

### Production Build

```bash
# Build JAR file
./mvnw clean package

# Run JAR
java -jar target/revconnect-0.0.1-SNAPSHOT.jar
```

### With Custom Profile

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

## 🧪 Testing

### Run All Tests

```bash
./mvnw test
```

### Run Specific Test Class

```bash
./mvnw test -Dtest=UserServiceTest
```

## 📊 Database Migration

The application uses Hibernate's `ddl-auto=update` for automatic schema updates during development. For production:

1. Set `spring.jpa.hibernate.ddl-auto=validate`
2. Use migration tools like Flyway or Liquibase
3. Maintain version-controlled SQL scripts

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database `revconnect_db` exists

**Port Already in Use:**
- Change port in `application.properties`: `server.port=8081`
- Or kill process using port 8080

**JWT Token Expired:**
- Token expires after 24 hours (configurable)
- User needs to login again

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-03-11T10:30:00"
}
```

## 🔄 Future Enhancements

- Real-time messaging using WebSockets
- File upload to cloud storage (AWS S3)
- Email notifications
- Advanced search with Elasticsearch
- Rate limiting
- API versioning
- Swagger/OpenAPI documentation

---

For frontend documentation, see [Frontend README](../../../../../../revconnect-frontend/README.md)
