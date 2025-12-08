import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AllReviews from './pages/AllReviews.jsx';
import ReviewDetails from './pages/ReviewDetails.jsx';
import AddReview from './pages/AddReview.jsx';
import MyReviews from './pages/MyReviews.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import EditReview from './pages/EditReview.jsx';
import MyFavorites from './pages/MyFavorites.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';
import DashboardSidebar from './components/DashboardSidebar.jsx';

import { Toaster } from 'react-hot-toast';

import axios from 'axios';
import { auth } from './firebase/firebase.config.js';

axios.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {

      if (import.meta.env.DEV && currentUser.email && !config.headers['X-User-Email']) {
        config.headers['X-User-Email'] = currentUser.email;
      }

      try {
        const token = await currentUser.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        'error'
      }


      if (import.meta.env.DEV) {
        try {
          const hasAuth = Boolean(config.headers.Authorization);
          const hasEmail = Boolean(config.headers['X-User-Email']);

          console.debug('[auth headers]', {
            url: config.url,
            hasAuthorization: hasAuth,
            hasXUserEmail: hasEmail,
          });
        } catch { err }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/allreviews', element: <AllReviews /> },
      {
        path: '/reviewdetails/:id',
        element: <ReviewDetails />,
      },
      {
        path: '/add-review',
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-review/:id',
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-favorites',
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      // Dashboard route
      {
        path: '/dashboard/*',
        element: (
          <DashboardLayout sidebar={<DashboardSidebar role={"Student"} />} />
        ),
        children: [
          { path: 'profile', element: <div>My Profile</div> },
          { path: 'add-scholarship', element: <div>Add Scholarship</div> },
          { path: 'manage-scholarships', element: <div>Manage Scholarships</div> },
          { path: 'manage-users', element: <div>Manage Users</div> },
          { path: 'analytics', element: <div>Analytics</div> },
          { path: 'applications', element: <div>Manage Applications</div> },
          { path: 'all-reviews', element: <div>All Reviews</div> },
          { path: 'my-applications', element: <div>My Applications</div> },
          { path: 'my-reviews', element: <div>My Reviews</div> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);