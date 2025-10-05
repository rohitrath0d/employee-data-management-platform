# Employee Management System

A modern, responsive employee management application built with React, Vite, and Tailwind CSS following industry best practices.

## 🚀 Features

### ✅ All Tasks Completed

#### 1. Application Structure & Routing ✅
- Clean component-based architecture
- React Router v6 for navigation
- Protected routes structure
- Nested routing for employee operations

#### 2. Employee List Component ✅
- **Data Display**: Professional table layout with employee information
- **Statistics Dashboard**: Real-time stats showing total employees, active count, and departments
- **Search & Filter**: Real-time search across name, email, position, and department fields
- **Actions**:
  - ✏️ Edit employee (navigates to edit form)
  - 🗑️ Delete employee (with animated confirmation modal)
  - ➕ Add new employee button
- **State Management**:
  - Loading spinner during data fetch
  - Error handling with retry functionality
  - Empty state for no employees
  - No results state for empty search
  - Optimistic UI updates after deletion

#### 3. Employee Form (Add/Edit) ✅
- Single form component for both add and edit operations
- **Advanced Validation with Yup**:
  - Name: 2-50 characters, letters and spaces only
  - Email: Valid email format, max 100 characters
  - Position: 2-50 characters, required
  - Phone: 10-20 characters, optional, numeric validation
  - Department: 2-50 characters, optional
- **Real-time validation**: Fields validate on blur and as you type
- **Inline error messages**: Visual feedback with icons
- Loading states during submission
- Error handling for API failures and duplicate emails
- Auto-prefill data in edit mode
- Toast notifications for success/failure

#### 4. Search/Filter Bar (Bonus) ✅
- **Real-time Search**: Instant filtering as you type
- **Multi-field Search**: Searches across name, email, position, and department
- **Performance Optimized**: Uses React.useMemo for efficient filtering
- **User Feedback**: 
  - Shows result count
  - Clear button to reset search
  - "No results" state with helpful message
- **Client-side Filtering**: Fast, responsive search without API calls

#### 5. UI/UX Enhancements ✅
- **Consistent Design System**: Modern, clean interface with Tailwind CSS
- **Loading Indicators**: 
  - Spinner while fetching employees
  - Loading states on all async operations
  - "Deleting..." state on delete button
- **Confirmation Modals**: 
  - Animated modal before deleting employees
  - Smooth fade-in and slide-up animations
- **Toast Notifications**: 
  - Success messages (green) for add/edit/delete
  - Error messages (red) with clear descriptions
  - Loading toasts during operations
- **Smooth Animations**:
  - Hover effects on cards and buttons
  - Active states with scale transforms
  - Modal animations with custom keyframes
  - Transition effects on all interactive elements
- **Responsive Design**: Fully responsive on all screen sizes

#### 6. State Management ✅
- **Custom React Hooks**: `useEmployees()` and `useEmployee()` for data management
- **Efficient State Handling**: 
  - Loading, error, and data states properly managed
  - Optimistic UI updates for instant feedback
  - Local state for UI-specific concerns
- **API Service Layer**: 
  - Centralized axios instance with interceptors
  - Request/response error handling
  - Token support for authentication
- **Performance**: 
  - React.useMemo for expensive filtering operations
  - Proper dependency arrays to prevent unnecessary re-renders

#### 7. Validation & Error Handling (Bonus) ✅
- **Yup Validation Schema**: 
  - Comprehensive validation rules
  - Custom error messages
  - Field-level and form-level validation
- **Real-time Validation**: 
  - Validates on blur
  - Validates on change for touched fields
  - Shows inline error messages with icons
- **Error States**: 
  - Visual feedback with red borders and backgrounds
  - Icon indicators for errors
  - Clear, user-friendly error messages
- **API Error Handling**: 
  - Graceful error handling for network failures
  - Duplicate email detection
  - User-friendly error messages via toasts

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.jsx       # Main layout wrapper with header/footer
│   ├── EmployeeTable.jsx # Employee table with actions and modal
│   ├── SearchBar.jsx    # Search/filter component
│   ├── EmptyState.jsx   # Empty state component
│   ├── ErrorMessage.jsx # Error display component
│   └── LoadingSpinner.jsx # Loading indicator
├── pages/               # Page components
│   ├── EmployeeListPage.jsx  # Employee list with search & stats
│   └── EmployeeFormPage.jsx  # Add/Edit form with validation
├── hooks/               # Custom React hooks
│   └── useEmployees.js  # Employee data management hooks
├── services/            # API services
│   └── employeeService.js # Axios-based API client
├── utils/               # Utility functions
│   ├── helpers.js       # Filter, debounce, validation utilities
│   └── validation.js    # Yup validation schemas
├── App.jsx             # Root component with routes & toast
└── main.jsx            # Application entry point
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS v4
- **Validation**: Yup
- **Notifications**: React Hot Toast
- **Language**: JavaScript (ES6+)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rohit_assign
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔌 API Integration

The application expects a REST API with the following endpoints:

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Employee Schema

```json
{
  "id": "string",
  "name": "string (required, 2-50 chars, letters only)",
  "email": "string (required, valid email, max 100 chars)",
  "position": "string (required, 2-50 chars)",
  "phone": "string (optional, 10-20 chars, numeric)",
  "department": "string (optional, 2-50 chars)"
}
```

## 🎨 Design Principles

### Industry Best Practices Applied

1. **Component Composition**
   - Small, focused components with single responsibility
   - Reusable UI components
   - Props-based communication
   - Container/Presentational pattern

2. **State Management**
   - Custom hooks for data fetching and state logic
   - Local state for UI-specific concerns
   - Proper error and loading state handling
   - Optimistic UI updates

3. **Performance Optimization**
   - React.useMemo for expensive computations (filtering)
   - Efficient re-rendering with proper dependency arrays
   - Client-side filtering for instant feedback
   - Debounce utility available for API searches

4. **API Layer Separation**
   - Dedicated service layer for API calls
   - Axios interceptors for request/response handling
   - Centralized error handling
   - Authentication token support

5. **Form Validation**
   - Schema-based validation with Yup
   - Real-time field validation
   - Comprehensive error messages
   - Both client and server error handling

6. **User Experience**
   - Loading states during async operations
   - Toast notifications for all actions
   - Confirmation modals for destructive actions
   - Smooth animations and transitions
   - Form validation with helpful error messages
   - Real-time search feedback
   - Responsive design for all screen sizes

7. **Code Quality**
   - Consistent naming conventions
   - Proper file organization
   - Clean, readable code
   - JSDoc comments for utility functions
   - Modular, maintainable codebase

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Key Features Breakdown

### Toast Notifications
- **Success**: Green toasts for successful operations (3s duration)
- **Error**: Red toasts for failures (4s duration)
- **Loading**: Gray toasts during async operations
- **Position**: Top-right corner, non-intrusive

### Form Validation
- **Yup Schema**: Comprehensive validation rules
- **Real-time Feedback**: Validates on blur and during typing
- **Visual Indicators**: Red borders, backgrounds, and error icons
- **Field-specific Messages**: Clear, actionable error messages

### Search Functionality
- **Multi-field Search**: Searches across all employee fields
- **Case-insensitive**: Works regardless of letter casing
- **Real-time Results**: Filters update instantly
- **Visual Feedback**: Result count and clear button
- **Performance**: Optimized with React memoization

### Animations & Transitions
- **Modal Animations**: Fade-in overlay, slide-up content
- **Button Effects**: Hover shadows, active scale transforms
- **Card Hovers**: Subtle shadow elevation
- **Loading States**: Smooth spinner animations
- **Form Interactions**: Smooth color transitions

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- XSS protection through React's built-in escaping
- CSRF token support (via axios interceptors)
- Secure API communication
- Input validation and sanitization
- Email format validation
- Authentication token storage support

## 📊 State Management Architecture

```
┌─────────────────────────────────────────┐
│           Component Layer               │
│  (EmployeeListPage, EmployeeFormPage)   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Custom Hooks Layer              │
│     (useEmployees, useEmployee)         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Service Layer                  │
│       (employeeService.js)              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           API Layer                     │
│      (Axios with interceptors)          │
└─────────────────────────────────────────┘
```

## 🎯 Future Enhancements

- Backend search integration (GET /api/employees?search=xyz)
- Debounced search for API calls
- Advanced filtering (by department, position)
- Sorting by columns (name, email, date added)
- Pagination for large datasets
- Export to CSV/Excel
- Bulk operations (bulk delete, bulk edit)
- Role-based access control
- Employee profile pictures
- Dark mode support
- Keyboard shortcuts
- Form auto-save drafts
- Undo delete functionality

## 📄 Dependencies

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.3",
    "axios": "^1.12.2",
    "react-hot-toast": "^2.4.1",
    "yup": "^1.4.0",
    "tailwindcss": "^4.1.14"
  }
}
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**

### ✨ Complete Feature Checklist

- [x] Application Structure & Routing
- [x] Employee List Component with CRUD operations
- [x] Employee Form (Add/Edit) with validation
- [x] Search/Filter functionality
- [x] UI/UX Enhancements (animations, transitions)
- [x] State Management with custom hooks
- [x] Validation & Error Handling with Yup
- [x] Toast Notifications for user feedback
- [x] Confirmation modals for destructive actions
- [x] Loading states on all async operations
- [x] Responsive design for all devices
- [x] API service layer with error handling
