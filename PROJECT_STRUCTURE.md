# Project Structure & Architecture

## 📁 Complete Project Structure

```
FE-apps-techtest/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── TopNav.jsx              # Navigation & theme toggle
│   │   └── TopNav.css              # Navigation styling
│   │
│   ├── context/
│   │   └── ThemeContext.jsx        # Dark/Light theme context
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Login.css               # Login styling
│   │   │
│   │   ├── Dashboard.jsx           # Dashboard page
│   │   ├── Dashboard.css           # Dashboard styling
│   │   │
│   │   ├── Customer.jsx            # Customer CRUD page
│   │   ├── Customer.css            # Customer styling
│   │   │
│   │   ├── Transactions.jsx        # ✨ NEW - Transaction CRUD page
│   │   └── Transactions.css        # ✨ NEW - Transaction styling
│   │
│   ├── services/
│   │   ├── api.js                  # Axios instance
│   │   ├── customerService.js      # Customer API calls
│   │   └── transactionService.js   # ✨ NEW - Transaction API calls
│   │
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styling
│   ├── index.css                   # Global styling
│   ├── main.jsx                    # Entry point
│   └── index.html                  # HTML template
│
├── db.json                         # Mock database (json-server)
├── package.json                    # Dependencies
├── vite.config.js                  # Vite config
├── eslint.config.js                # ESLint config
│
└── Documentation Files (NEW)
    ├── TRANSACTION_SUMMARY.md      # Complete implementation summary
    ├── TRANSACTION_IMPLEMENTATION.md # Detailed documentation
    ├── TRANSACTION_QUICKSTART.md   # Quick start guide
    ├── TRANSACTION_EXAMPLES.md     # Code examples & best practices
    └── PROJECT_STRUCTURE.md        # This file
```

---

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         UI Layer (Components)           │
│  ┌──────────────────────────────────┐   │
│  │ Pages (Login, Dashboard, etc)    │   │
│  │ Components (TopNav, etc)         │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      State Management Layer             │
│  ┌──────────────────────────────────┐   │
│  │ useState, useEffect              │   │
│  │ ThemeContext                     │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↓
┌──────���──────────────────────────────────┐
│      Service Layer (API)                │
│  ┌──────────────────────────────────┐   │
│  │ transactionService.js            │   │
│  │ customerService.js               │   │
│  │ api.js (Axios instance)          │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Backend (json-server)              │
│  ┌──────────────────────────────────┐   │
│  │ GET /transactions                │   │
│  │ POST /transactions               │   │
│  │ PUT /transactions/:id            │   │
│  │ DELETE /transactions/:id         │   │
│  └──────────────────────────���───────┘   │
└─────────────────────────────────────────┘
```

---

## 📊 Data Flow

### Transaction CRUD Flow

```
User Action
    ↓
Component (Transactions.jsx)
    ├─ State Update
    ├─ Form Validation
    └─ API Call
        ↓
    Service Layer (transactionService.js)
        ├─ getTransactions()
        ├─ createTransaction()
        ├─ updateTransaction()
        └─ deleteTransaction()
            ↓
        API Layer (api.js)
            ├─ GET /transactions
            ├─ POST /transactions
            ├─ PUT /transactions/:id
            └─ DELETE /transactions/:id
                ↓
            Backend (json-server)
                ├─ Read db.json
                ├─ Modify data
                └─ Write db.json
                    ↓
                Response
                    ↓
            Component
                ├─ Update state
                ├─ Show message
                └─ Refresh UI
```

---

## 🔄 Component Relationships

```
App.jsx
├── Router
│   ├── /login → Login.jsx
│   ├── /dashboard → Dashboard.jsx
│   │   └── TopNav.jsx
│   ├── /customer → Customer.jsx
│   │   ├── TopNav.jsx
│   │   └── Modal (Create/Edit)
│   └── /transactions → Transactions.jsx ✨ NEW
│       ├── TopNav.jsx
│       └── Modal (Create/Edit)
│
└── ThemeProvider
    └── ThemeContext
        └── Dark/Light theme state
```

---

## 📝 File Descriptions

### Core Files

#### `src/App.jsx`
- Main application component
- Router setup
- Route definitions
- ThemeProvider wrapper

#### `src/main.jsx`
- Entry point
- React DOM render
- App component mount

#### `src/index.css`
- Global styles
- Theme variables
- Base element styling

---

### Pages

#### `src/pages/Login.jsx`
- Login form
- Authentication logic
- Redirect to dashboard

#### `src/pages/Dashboard.jsx`
- Welcome page
- Overview information
- Navigation to other pages

#### `src/pages/Customer.jsx`
- Customer CRUD operations
- Table display
- Modal form
- Full CRUD functionality

#### `src/pages/Transactions.jsx` ✨ NEW
- Transaction CRUD operations
- Table display with relational data
- Modal form with dropdowns
- Full CRUD functionality
- Parallel data fetching

---

### Components

#### `src/components/TopNav.jsx`
- Navigation menu
- Theme toggle button
- Logout functionality
- User info display

#### `src/context/ThemeContext.jsx`
- Theme state management
- Dark/Light theme toggle
- LocalStorage persistence
- Context provider

---

### Services

#### `src/services/api.js`
- Axios instance
- Base URL configuration
- Default headers
- Interceptors (if needed)

#### `src/services/customerService.js`
- getCustomers()
- createCustomer()
- updateCustomer()
- deleteCustomer()

#### `src/services/transactionService.js` ✨ NEW
- getTransactions()
- createTransaction()
- updateTransaction()
- deleteTransaction()
- getCustomers()
- getPackages()

---

### Styling

#### `src/pages/Transactions.css` ✨ NEW
- Light theme styles
- Dark theme styles
- Responsive design
- Component-specific styles

---

### Database

#### `db.json`
- Mock database
- Customers collection
- Packages collection
- Transactions collection

---

## 🔌 Integration Points

### 1. Theme Integration
```javascript
// ThemeContext provides theme state
// TopNav toggles theme
// All pages use :root[data-theme="light/dark"] CSS
```

### 2. Navigation Integration
```javascript
// App.jsx defines routes
// TopNav provides navigation links
// React Router handles page transitions
```

### 3. API Integration
```javascript
// Services call api.js
// api.js uses axios
// Components use services
```

### 4. State Management
```javascript
// Components use useState for local state
// ThemeContext for global theme state
// Form.useForm() for form state
```

---

## 🎯 Key Features by Page

### Login Page
- ✅ Simple login form
- ✅ Redirect to dashboard
- ✅ No authentication (mock)

### Dashboard Page
- ✅ Welcome message
- ✅ Navigation links
- ✅ Theme toggle

### Customer Page
- ✅ Display customers in table
- ✅ Create customer
- ✅ Edit customer
- ✅ Delete customer
- ✅ Form validation
- ✅ Dark/Light theme

### Transaction Page ✨ NEW
- ✅ Display transactions with relational data
- ✅ Create transaction
- ✅ Edit transaction
- ✅ Delete transaction
- ✅ Customer dropdown
- ✅ Package dropdown
- ✅ Date picker
- ✅ Form validation
- ✅ Dark/Light theme
- ✅ Parallel data fetching

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Backend
```bash
json-server --watch db.json --port 3001
```

### 3. Start Frontend
```bash
npm run dev
```

### 4. Access Application
```
http://localhost:5173
```

---

## 📦 Dependencies

### Core
- `react`: ^18.0.0
- `react-dom`: ^18.0.0
- `react-router-dom`: ^6.0.0

### UI
- `antd`: ^5.0.0

### HTTP
- `axios`: ^1.0.0

### Development
- `vite`: ^4.0.0
- `eslint`: ^8.0.0

---

## 🎨 Styling Architecture

### CSS Organization
```
Global Styles (index.css)
    ↓
Page Styles (Transactions.css, Customer.css, etc)
    ├─ Light Theme (:root[data-theme="light"])
    ├─ Dark Theme (:root[data-theme="dark"])
    └─ Responsive (@media queries)
```

### Color Scheme

**Light Theme:**
- Primary: #355fdc (Blue)
- Background: #ffffff (White)
- Text: #1a1a1a (Dark)
- Border: #d9d9d9 (Light Gray)

**Dark Theme:**
- Primary: #355fdc (Blue)
- Background: #1a1a1a (Dark)
- Text: rgba(255, 255, 255, 0.87) (Light)
- Border: #434343 (Dark Gray)

---

## 🧪 Testing Strategy

### Unit Testing
- Test individual functions
- Test API calls
- Test state updates

### Integration Testing
- Test component interactions
- Test form submission
- Test CRUD operations

### E2E Testing
- Test complete user flows
- Test dark/light theme
- Test responsive design

---

## 📈 Performance Optimization

### Current Optimizations
- ✅ Parallel data fetching (Promise.all)
- ✅ Pagination support
- ✅ Lazy loading (React Router)
- ✅ CSS optimization

### Potential Optimizations
- [ ] Implement useMemo for expensive calculations
- [ ] Implement useCallback for event handlers
- [ ] Add code splitting
- [ ] Add image optimization
- [ ] Add caching strategy

---

## 🔒 Security Considerations

### Current Implementation
- ✅ No sensitive data in localStorage
- ✅ No hardcoded credentials
- ✅ CORS handled by backend

### Recommendations
- [ ] Add authentication tokens
- [ ] Add HTTPS
- [ ] Add input sanitization
- [ ] Add rate limiting
- [ ] Add CSRF protection

---

## 📚 Documentation Files

### 1. TRANSACTION_SUMMARY.md
- Complete implementation overview
- Key features
- Code quality
- Next steps

### 2. TRANSACTION_IMPLEMENTATION.md
- Detailed function explanations
- Data flow diagram
- API payload structure
- Performance tips
- Testing checklist

### 3. TRANSACTION_QUICKSTART.md
- Setup instructions
- Testing scenarios
- API endpoints
- Troubleshooting
- Next steps

### 4. TRANSACTION_EXAMPLES.md
- Code examples
- Best practices
- Common patterns
- Performance tips
- Testing tips

### 5. PROJECT_STRUCTURE.md
- This file
- Project overview
- Architecture
- File descriptions
- Integration points

---

## 🔄 Development Workflow

### 1. Feature Development
```
1. Create feature branch
2. Implement component
3. Add styling
4. Test functionality
5. Commit changes
6. Create pull request
```

### 2. Bug Fixing
```
1. Identify bug
2. Create bug branch
3. Fix issue
4. Test fix
5. Commit changes
6. Create pull request
```

### 3. Code Review
```
1. Review code quality
2. Check styling
3. Verify functionality
4. Test edge cases
5. Approve/Request changes
```

---

## 🎓 Learning Resources

### React
- [React Documentation](https://react.dev)
- [React Hooks](https://react.dev/reference/react)
- [React Router](https://reactrouter.com)

### Ant Design
- [Ant Design Documentation](https://ant.design)
- [Ant Design Components](https://ant.design/components/overview)

### Axios
- [Axios Documentation](https://axios-http.com)

### Vite
- [Vite Documentation](https://vitejs.dev)

---

## 🤝 Contributing

### Code Style
- Use functional components
- Use React Hooks
- Use meaningful names
- Add comments for complex logic
- Follow project conventions

### Commit Messages
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
```

---

## 📞 Support

### Common Issues
1. Backend not running → Start json-server
2. API errors → Check network tab
3. Styling issues → Check theme toggle
4. Form errors → Check validation rules

### Debug Tips
1. Check browser console
2. Check network tab
3. Check Redux DevTools (if using Redux)
4. Check component props
5. Check state values

---

## 🎉 Summary

This project demonstrates:
- ✅ Clean React architecture
- ✅ Proper state management
- ✅ API integration
- ✅ Form handling
- ✅ Dark/Light theme support
- ✅ Responsive design
- ✅ Error handling
- ✅ Code organization

---

## 📝 Next Steps

1. **Test the implementation**
   - Follow TRANSACTION_QUICKSTART.md
   - Test all CRUD operations

2. **Customize if needed**
   - Add more fields
   - Add filters
   - Add reports

3. **Deploy**
   - Build frontend
   - Deploy to production
   - Setup production database

---

**Happy coding! 🚀**
