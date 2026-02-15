# ScholarStream - Scholarship Management Platform

## Project Overview
ScholarStream is a scholarship management platform that connects students with global scholarship opportunities. Students can search, filter, and apply for scholarships, while administrators can manage applications and content.

## Live URL
https://your-site.netlify.app

## Purpose
To help students find and apply for scholarships easily, and to help universities manage scholarship applications efficiently.

## Key Features
- Advanced search and filtering for scholarships
- Detailed scholarship information
- Integrated payment system for application fees
- Application management and tracking
- Review system for students
- Secure authentication (Firebase)
- User and role management for admins
- Analytics dashboard
- Responsive design
- Secure data using environment variables

## NPM Packages Used
- react
- react-router-dom
- axios
- firebase
- dotenv
- tailwindcss
- daisyui
- framer-motion
- swiper
- @stripe/react-stripe-js
- (Add any other packages you have used)
- **@stripe/stripe-js 8.5.3** - Stripe.js library

### State & Data Management:
- **Redux Toolkit 2.11.1** - Powerful state management
- **Axios 1.13.2** - Promise-based HTTP client
- **React Hot Toast 2.4.1** - Beautiful toast notifications

### Data Visualization:
- **Chart.js 4.5.1** - Flexible charting library
- **react-chartjs-2 5.4.0** - React wrapper for Chart.js

### Utilities:
- **React Helmet 6.1.0** - Document head manager
- **SweetAlert2 11.15.10** - Beautiful pop-up modals

##  Complete Package List

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.11.1",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.5.3",
    "axios": "^1.13.2",
    "chart.js": "^4.5.1",
    "daisyui": "^5.5.8",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.25",
    "react": "^19.0.0",
    "react-chartjs-2": "^5.4.0",
    "react-dom": "^19.0.0",
    "react-helmet": "^6.1.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.10.1",
    "sweetalert2": "^11.15.10",
    "swiper": "^12.0.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.7",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.21.0",
    "eslint-plugin-react": "^7.37.4",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.18",
    "globals": "^15.17.0",
    "postcss": "^8.5.1",
    "tailwindcss": "^4.1.7",
    "vite": "^7.2.4"
  }
}
```

##  Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Backend API
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Payment
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

**Never commit `.env` file to version control!**

##  Installation & Setup

### Prerequisites:
- Node.js 18+ installed
- npm or yarn package manager
- Git installed

### Steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Evasfaisal/scholarstream-client.git
   cd scholarstream-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Create .env file in root directory
   # Add all required environment variables (see above section)
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Application will open at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

##  Application Structure

### Public Routes:
- `/` - Home page with hero section and featured scholarships
- `/allscholarships` - Browse all scholarships with search/filter
- `/scholarship/:id` - Detailed scholarship information
- `/login` - User authentication
- `/register` - New user registration

### Protected Routes (Authentication Required):
- `/dashboard` - User dashboard (role-based content)
- `/dashboard/my-applications` - Track personal applications
- `/checkout` - Payment processing page
- `/payment/success` - Payment confirmation
- `/payment/failed` - Payment failure handling

### Admin/Moderator Routes:
- `/dashboard/users` - User management (Admin only)
- `/dashboard/manage-scholarships` - Scholarship CRUD (Admin/Moderator)
- `/dashboard/applications` - Review applications (Moderator)
- `/dashboard/analytics` - Platform statistics (Admin)

##  Design Philosophy

### Color Palette:
- **Primary**: Purple (#8B5CF6) - Trust and creativity
- **Secondary**: Blue (#3B82F6) - Professionalism
- **Accent**: Pink (#EC4899) - Energy and excitement
- **Success**: Green (#10B981) - Positive actions
- **Warning**: Orange (#F59E0B) - Attention needed

### Design Principles:
 **Clean & Modern** - Minimalist interface with ample white space
 **User-Centric** - Intuitive navigation and clear CTAs
 **Mobile-First** - Responsive design for all devices
 **Performance** - Optimized images and lazy loading
 **Animations** - Subtle transitions for better UX

##  Security Features

-  Firebase Authentication with JWT tokens
- Environment variables for sensitive data
- Protected API routes with authentication middleware
-  Role-based access control (RBAC)
-  Secure payment processing via Stripe
-  Input validation and sanitization
-  HTTPS enforcement in production
-  CORS configuration for API security

##  Database Schema

### Collections:

**1. Users Collection**
```javascript
{
  name: String,
  email: String,
  photoURL: String,
  role: String 
}
```

**2. Scholarships Collection**
```javascript
{
  scholarshipName: String,
  universityName: String,
  universityImage: String,
  universityCountry: String,
  universityCity: String,
  universityWorldRank: Number,
  subjectCategory: String,
  scholarshipCategory: String, 
  degree: String, 
  tuitionFees: Number,
  applicationFees: Number,
  serviceCharge: Number,
  applicationDeadline: Date,
  scholarshipPostDate: Date,
  postedUserEmail: String
}
```

**3. Applications Collection**
```javascript
{
  scholarshipId: ObjectId,
  userId: String,
  userName: String,
  userEmail: String,
  universityName: String,
  scholarshipCategory: String,
  degree: String,
  applicationFees: Number,
  serviceCharge: Number,
  applicationStatus: String, 
  paymentStatus: String, 
  applicationDate: Date,
  feedback: String
}
```

**4. Reviews Collection**
```javascript
{
  scholarshipId: ObjectId,
  universityName: String,
  userName: String,
  userEmail: String,
  userImage: String,
  ratingPoint: Number,
  reviewComment: String,
  reviewDate: Date
}
```

##  Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Developer Information

**Eva's Faisal**
- GitHub: [@Evasfaisal](https://github.com/Evasfaisal)
- Portfolio: [your-portfolio-url]
- Email: your.email@example.com

##  Acknowledgments

- Firebase for authentication services
- Stripe for secure payment processing
- MongoDB for flexible database solutions
- TailwindCSS and DaisyUI for beautiful UI components
- All open-source contributors who made this possible

##  Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

**Built with and React by Eva's Faisal**

*Making scholarship opportunities accessible to students worldwide* 
