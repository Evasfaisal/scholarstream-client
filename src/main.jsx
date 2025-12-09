import DashboardSidebar from './components/DashboardSidebar.jsx';
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
import NotFound from './pages/NotFound.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';

import AdminScholarships from './pages/AdminScholarships.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminAnalytics from './pages/AdminAnalytics.jsx';
import ModeratorApplications from './pages/ModeratorApplications.jsx';
import MyApplications from './pages/MyApplications.jsx';
import Success from './pages/Success.jsx';
import Failed from './pages/Failed.jsx';
import Checkout from './pages/Checkout.jsx';

import { Toaster } from 'react-hot-toast';

import axios from 'axios';
import { auth } from './firebase/firebase.config.js';
import { useAuth } from './context/AuthContext.jsx';

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

function DashboardSidebarWithRole() {
  const { user } = useAuth();
  const [role, setRole] = React.useState('Student');
  React.useEffect(() => {
    if (user && user.uid) {
   
      import('./firebase/firebase.config').then(({ db }) => {
        import('firebase/firestore').then(({ doc, getDoc }) => {
          getDoc(doc(db, 'users', user.uid)).then((snap) => {
            if (snap.exists()) setRole(snap.data().role || 'Student');
          });
        });
      });
    }
  }, [user]);
  return <DashboardSidebar role={role} />;
}

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
        path: '/dashboard/*',
        element: (
          <DashboardLayout sidebar={<DashboardSidebarWithRole />} />
        ),
        children: [
          { path: 'profile', element: <div>My Profile</div> },
          { path: 'add-scholarship', element: <div>Add Scholarship</div> },
          { path: 'manage-scholarships', element: <AdminScholarships /> },
          { path: 'manage-users', element: <AdminUsers /> },
          { path: 'analytics', element: <AdminAnalytics /> },
          { path: 'applications', element: <ModeratorApplications /> },
          { path: 'all-reviews', element: <AllReviews /> },
          { path: 'my-applications', element: <MyApplications /> },
        
        ],
      },
      { path: '/success', element: <Success /> },
      { path: '/failed', element: <Failed /> },
      { path: '/checkout', element: <PrivateRoute><Checkout /></PrivateRoute> },
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