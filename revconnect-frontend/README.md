# RevConnect Frontend - Angular Application

Modern, responsive frontend for the RevConnect social media platform built with Angular 21, Bootstrap 5, and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Features](#features)
- [Components](#components)
- [Services](#services)
- [Routing](#routing)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Configuration](#configuration)

## 🌟 Overview

The RevConnect frontend is a single-page application (SPA) that provides an intuitive and responsive user interface for social networking. It communicates with the Spring Boot backend via RESTful APIs and implements JWT-based authentication.

## 🛠 Technologies

- **Angular 21.1.0**: Modern web framework
- **TypeScript 5.9.2**: Type-safe JavaScript
- **Bootstrap 5.3.8**: Responsive UI framework
- **Font Awesome 7.2.0**: Icon library
- **RxJS 7.8.0**: Reactive programming
- **Angular Router**: Client-side routing
- **Angular Forms**: Reactive and template-driven forms
- **Angular HttpClient**: HTTP communication

## 📁 Project Structure

```
revconnect-frontend/
├── src/
│   ├── app/
│   │   ├── components/              # UI Components
│   │   │   ├── welcome/            # Landing page
│   │   │   ├── login/              # Login page
│   │   │   ├── register/           # Registration page
│   │   │   ├── dashboard/          # Main dashboard
│   │   │   ├── feed/               # Post feed
│   │   │   ├── profile/            # User profile
│   │   │   ├── user-profile/       # View other profiles
│   │   │   ├── create-post/        # Create/edit posts
│   │   │   ├── my-posts/           # User's posts
│   │   │   ├── network/            # Connections & follows
│   │   │   ├── notifications/      # Notifications center
│   │   │   ├── settings/           # User settings
│   │   │   ├── business-profile/   # Business profile
│   │   │   ├── analytics/          # Analytics dashboard
│   │   │   ├── scheduled-posts/    # Scheduled posts
│   │   │   └── forgot-password/    # Password recovery
│   │   ├── services/               # API Services
│   │   │   ├── auth.ts            # Authentication
│   │   │   ├── user.ts            # User operations
│   │   │   ├── profile.ts         # Profile management
│   │   │   ├── post.ts            # Post operations
│   │   │   ├── like.ts            # Like functionality
│   │   │   ├── comment.ts         # Comment operations
│   │   │   ├── repost.ts          # Repost functionality
│   │   │   ├── connection.ts      # Connections
│   │   │   ├── follow.ts          # Follow/unfollow
│   │   │   ├── notification.ts    # Notifications
│   │   │   ├── business-profile.ts # Business features
│   │   │   ├── scheduled-post.ts  # Post scheduling
│   │   │   └── settings.ts        # User settings
│   │   ├── guards/                # Route guards
│   │   │   └── auth.guard.ts     # Authentication guard
│   │   ├── app.routes.ts         # Route configuration
│   │   ├── app.config.ts         # App configuration
│   │   └── app.ts                # Root component
│   ├── styles.css                # Global styles
│   └── main.ts                   # Application entry point
├── public/                       # Static assets
├── angular.json                  # Angular configuration
├── package.json                  # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## ✨ Features

### Authentication & Authorization
- User registration with account type selection
- Secure login with JWT tokens
- Password recovery flow
- Route guards for protected pages
- Auto-logout on token expiration

### User Profile Management
- View and edit personal profile
- Upload profile picture
- Set profile privacy (public/private)
- View other users' profiles
- Search users by name

### Post Management
- Create text posts with hashtags
- Edit and delete own posts
- View personalized feed
- View user-specific posts
- Search posts by content/hashtags
- Trending posts

### Social Interactions
- Like/unlike posts
- Comment on posts
- Delete own comments
- Repost content with attribution
- View post engagement metrics

### Network Building
- Send connection requests
- Accept/reject connection requests
- View connections list
- Remove connections
- Follow/unfollow users
- View followers and following lists

### Notifications
- Real-time notification updates
- Unread notification count badge
- Mark notifications as read
- Notification history
- Notification preferences

### Business Features (Business/Creator Accounts)
- Enhanced business profile
- Business information management
- Product/service showcase
- External links management
- Post scheduling
- Pin important posts
- Analytics dashboard
  - Post views and engagement
  - Follower demographics
  - Engagement metrics

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Bootstrap-based modern UI
- Font Awesome icons
- Loading indicators
- Error handling with user-friendly messages
- Form validation
- Confirmation dialogs

## 🧩 Components

### Core Components

#### WelcomeComponent (`/`)
Landing page with app introduction and navigation to login/register.

#### LoginComponent (`/login`)
User authentication with email/username and password.

#### RegisterComponent (`/register`)
New user registration with account type selection (Personal, Business, Creator).

#### DashboardComponent (`/dashboard`)
Main application layout with navigation sidebar and content area.

#### FeedComponent (`/feed`)
Personalized post feed from connections and followed accounts.

#### ProfileComponent (`/profile`)
Current user's profile view and edit functionality.

#### UserProfileComponent (`/user/:id`)
View other users' profiles with connection/follow actions.

#### CreatePostComponent (`/create-post`)
Create and edit posts with hashtag support.

#### MyPostsComponent (`/my-posts`)
View and manage user's own posts.

#### NetworkComponent (`/network`)
Manage connections, followers, and following.

#### NotificationsComponent (`/notifications`)
View and manage notifications.

#### SettingsComponent (`/settings`)
User preferences and notification settings.

#### BusinessProfileComponent (`/business-profile`)
Business account profile management.

#### AnalyticsComponent (`/analytics`)
Analytics dashboard for business/creator accounts.

#### ScheduledPostsComponent (`/scheduled-posts`)
Manage scheduled posts.

#### ForgotPasswordComponent (`/forgot-password`)
Password recovery flow.

## 🔌 Services

### AuthService
Handles authentication operations:
- `register(data)`: Register new user
- `login(credentials)`: User login
- `logout()`: Clear session
- `isAuthenticated()`: Check auth status
- `getToken()`: Get JWT token
- `getCurrentUser()`: Get current user info

### UserService
User-related operations:
- `getCurrentUser()`: Get current user details
- `searchUsers(query)`: Search users
- `getUserById(id)`: Get user by ID

### ProfileService
Profile management:
- `getProfile()`: Get current user profile
- `getUserProfile(userId)`: Get user profile by ID
- `updateProfile(data)`: Update profile
- `uploadProfilePicture(file)`: Upload picture

### PostService
Post operations:
- `getFeed()`: Get personalized feed
- `getUserPosts(userId)`: Get user's posts
- `createPost(data)`: Create new post
- `updatePost(id, data)`: Update post
- `deletePost(id)`: Delete post
- `searchPosts(query)`: Search posts
- `getTrendingPosts()`: Get trending posts

### LikeService
Like functionality:
- `likePost(postId)`: Like a post
- `unlikePost(postId)`: Unlike a post
- `getPostLikes(postId)`: Get post likes

### CommentService
Comment operations:
- `addComment(data)`: Add comment
- `getPostComments(postId)`: Get comments
- `deleteComment(id)`: Delete comment

### RepostService
Repost functionality:
- `repost(postId)`: Repost content
- `removeRepost(postId)`: Remove repost

### ConnectionService
Connection management:
- `sendRequest(userId)`: Send connection request
- `acceptRequest(requestId)`: Accept request
- `rejectRequest(requestId)`: Reject request
- `removeConnection(userId)`: Remove connection
- `getConnections()`: Get connections list
- `getPendingRequests()`: Get pending requests

### FollowService
Follow operations:
- `follow(userId)`: Follow user
- `unfollow(userId)`: Unfollow user
- `getFollowers()`: Get followers list
- `getFollowing()`: Get following list

### NotificationService
Notification handling:
- `getNotifications()`: Get notifications
- `getUnreadCount()`: Get unread count
- `markAsRead(id)`: Mark notification as read
- `markAllAsRead()`: Mark all as read

### BusinessProfileService
Business profile operations:
- `createBusinessProfile(data)`: Create profile
- `getBusinessProfile()`: Get profile
- `updateBusinessProfile(data)`: Update profile
- `addProduct(data)`: Add product/service
- `addExternalLink(data)`: Add link

### ScheduledPostService
Post scheduling:
- `schedulePost(data)`: Schedule post
- `getScheduledPosts()`: Get scheduled posts
- `cancelScheduledPost(id)`: Cancel scheduled post

### SettingsService
User settings:
- `getSettings()`: Get user settings
- `updateSettings(data)`: Update settings
- `updateNotificationPreferences(data)`: Update preferences

## 🛣 Routing

### Public Routes
- `/` - Welcome page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery

### Protected Routes (Require Authentication)
- `/dashboard` - Main dashboard
- `/feed` - Post feed
- `/profile` - User profile
- `/user/:id` - View user profile
- `/create-post` - Create post
- `/my-posts` - User's posts
- `/network` - Network management
- `/notifications` - Notifications
- `/settings` - User settings

### Business/Creator Routes
- `/business-profile` - Business profile
- `/analytics` - Analytics dashboard
- `/scheduled-posts` - Scheduled posts

### Route Guards

**AuthGuard**: Protects routes requiring authentication
```typescript
canActivate: [AuthGuard]
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- Angular CLI (optional)

### Install Dependencies

```bash
cd revconnect-frontend
npm install
```

## 💻 Development

### Start Development Server

```bash
npm start
# or
ng serve
```

Application runs on: `http://localhost:4200`

### Development Features
- Hot module replacement
- Auto-reload on file changes
- Source maps for debugging

## 🏗 Build

### Development Build

```bash
npm run build
# or
ng build
```

Output: `dist/revconnect-frontend/`

### Production Build

```bash
ng build --configuration production
```

Production optimizations:
- Minification
- Tree shaking
- Ahead-of-Time (AOT) compilation
- Bundle optimization

## ⚙️ Configuration

### API Base URL

Update API endpoint in service files or create an environment configuration:

```typescript
// services/auth.ts (example)
private apiUrl = 'http://localhost:8080/api';
```

### Environment Files (Optional)

Create environment files for different configurations:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.revconnect.com/api'
};
```

### Bootstrap & Font Awesome

Already configured in `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "src/styles.css"
]
```

## 🧪 Testing

### Run Unit Tests

```bash
npm test
# or
ng test
```

### Run with Coverage

```bash
ng test --code-coverage
```

## 🎨 Styling

### Global Styles
Located in `src/styles.css` - contains global CSS rules.

### Component Styles
Each component has its own CSS file:
- Scoped to component
- No style leakage

### Bootstrap Classes
Extensive use of Bootstrap utility classes for responsive design:
- Grid system (`container`, `row`, `col-*`)
- Spacing (`m-*`, `p-*`)
- Display (`d-flex`, `d-none`)
- Colors (`text-*`, `bg-*`)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 576px
- Tablet: 576px - 992px
- Desktop: > 992px

## 🔒 Security

### JWT Token Storage
- Stored in localStorage
- Included in Authorization header
- Auto-removed on logout

### XSS Protection
- Angular's built-in sanitization
- No innerHTML usage with user content

### CSRF Protection
- Not needed for JWT-based auth
- Stateless authentication

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
- Ensure backend CORS is configured for `http://localhost:4200`
- Check backend is running

**API Connection Failed:**
- Verify backend is running on port 8080
- Check API URL in services

**Token Expired:**
- User needs to login again
- Token expires after 24 hours

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Angular cache: `rm -rf .angular`

## 📦 Dependencies

### Core Dependencies
- `@angular/core`: Angular framework
- `@angular/common`: Common Angular utilities
- `@angular/forms`: Form handling
- `@angular/router`: Routing
- `bootstrap`: UI framework
- `@fortawesome/fontawesome-free`: Icons
- `rxjs`: Reactive programming

### Dev Dependencies
- `@angular/cli`: Angular CLI
- `@angular/compiler-cli`: Angular compiler
- `typescript`: TypeScript compiler
- `vitest`: Testing framework

## 🔄 Future Enhancements

- Progressive Web App (PWA) support
- Real-time updates with WebSockets
- Image upload and preview
- Rich text editor for posts
- Dark mode theme
- Internationalization (i18n)
- Lazy loading for routes
- State management (NgRx/Akita)
- Advanced search filters
- Infinite scroll for feeds

## 📝 Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Component naming: `*.component.ts`
- Service naming: `*.service.ts`
- Use async/await for promises
- Use RxJS operators for observables

---

For backend documentation, see [Backend README](../README.md)
