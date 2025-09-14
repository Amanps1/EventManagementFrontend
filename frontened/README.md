# Event Management System - Frontend

A modern, responsive React frontend for the Event Management System with beautiful animations and intuitive user experience.

## 🚀 Features

### ✨ Modern UI/UX
- **Glass Morphism Design** - Beautiful translucent components with backdrop blur effects
- **Gradient Backgrounds** - Eye-catching animated gradient backgrounds
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Responsive Design** - Works seamlessly across all device sizes
- **Dark/Light Theme Support** - Adaptive color schemes

### 🎯 Core Functionality
- **Authentication System** - Login, Register, Password Reset
- **Dashboard** - Real-time statistics and quick actions
- **Event Management** - Create, edit, delete, and manage events
- **User Management** - Admin panel for user roles and permissions
- **Notification System** - Real-time notifications with priority levels
- **Search & Filters** - Advanced filtering and search capabilities

### 🎨 Components
- **Interactive Cards** - Hover effects and smooth transitions
- **Modern Forms** - Validation with real-time feedback
- **Data Tables** - Sortable and filterable data displays
- **Modal Dialogs** - Elegant popup interfaces
- **Loading States** - Beautiful loading animations
- **Toast Notifications** - Non-intrusive user feedback

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Production-ready motion library
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EventMangementFrontend/frontened
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── api/                    # API service functions
│   ├── authApi.js         # Authentication endpoints
│   ├── eventApi.js        # Event management endpoints
│   ├── userApi.js         # User management endpoints
│   └── venueApi.js        # Venue management endpoints
├── components/            # Reusable components
│   ├── common/           # Shared components
│   │   ├── Navbar.jsx    # Navigation bar
│   │   ├── Sidebar.jsx   # Side navigation
│   │   ├── Modal.jsx     # Modal dialogs
│   │   └── NotificationCenter.jsx # Notification system
│   ├── cards/            # Card components
│   └── tables/           # Table components
├── context/              # React context providers
│   ├── AuthContext.jsx  # Authentication state
│   └── EventContext.jsx # Event management state
├── hooks/                # Custom React hooks
├── pages/                # Page components
│   ├── auth/            # Authentication pages
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── ForgotPasswordPage.jsx
│   ├── dashboard/       # Dashboard pages
│   │   └── DashboardPage.jsx
│   ├── events/          # Event management pages
│   │   ├── EventsPage.jsx
│   │   ├── CreateEventPage.jsx
│   │   └── EventDetailPage.jsx
│   └── users/           # User management pages
│       ├── UsersPage.jsx
│       └── ProfilePage.jsx
├── routes/              # Route configuration
│   └── AppRoutes.jsx
├── utils/               # Utility functions
└── styles/              # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (600) to Purple (600) gradients
- **Secondary**: Pink (500) to Rose (500) gradients
- **Success**: Green (500) to Emerald (500) gradients
- **Warning**: Yellow (500) to Amber (500) gradients
- **Error**: Red (500) to Orange (500) gradients

### Typography
- **Headings**: Inter font family with gradient text effects
- **Body**: System font stack for optimal readability
- **Code**: Monospace font for technical content

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Component Interactions**: Hover and click animations
- **Loading States**: Skeleton screens and spinners
- **Micro-interactions**: Button presses and form feedback

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=Event Management System
```

### API Integration
The frontend connects to the Spring Boot backend running on `http://localhost:8080`. Update the API base URL in the environment variables if needed.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

## 🎯 Key Features Breakdown

### Authentication
- Modern glass morphism login/register forms
- Password strength indicators
- Social login integration ready
- Remember me functionality
- Password reset flow

### Dashboard
- Real-time statistics cards with animations
- Quick action buttons
- Recent activity feed
- System health indicators
- Performance metrics

### Event Management
- Drag-and-drop event creation
- Calendar integration
- Bulk operations
- Advanced filtering
- Export capabilities

### User Management
- Role-based access control
- Bulk user operations
- User activity tracking
- Profile management
- Permission matrix

### Notifications
- Real-time push notifications
- Priority-based categorization
- Mark as read/unread
- Notification history
- Custom notification preferences

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy loading of route components
- **Image Optimization** - WebP format with fallbacks
- **Bundle Analysis** - Webpack bundle analyzer integration
- **Caching Strategy** - Service worker for offline support
- **Tree Shaking** - Unused code elimination

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🔒 Security Features

- **XSS Protection** - Input sanitization
- **CSRF Protection** - Token-based validation
- **Secure Headers** - Content Security Policy
- **Authentication** - JWT token management
- **Authorization** - Role-based access control

## 📈 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tailwind CSS** - For the amazing utility-first CSS framework
- **Framer Motion** - For beautiful animations
- **Lucide** - For the comprehensive icon library
- **React Team** - For the incredible React framework

---

Built with ❤️ using React and modern web technologies.