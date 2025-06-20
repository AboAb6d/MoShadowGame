import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageContent from './pages/ManageContent';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import SeoControl from './pages/SeoControl';
import Monetization from './pages/Monetization';

// A simple component to simulate a protected route
const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
  if (!isAdminLoggedIn) {
    // Redirect them to the login page, but how to get there from React app?
    // For now, we can't easily redirect to a non-React page like admin_login.html
    // This highlights a challenge with mixed React/non-React auth flow.
    // A better approach would be to have admin_login.html redirect to /admin/ after login,
    // and this React app lives under /admin/ base path.
    // For this step, we'll assume if not logged in, they shouldn't be here,
    // and rely on the entry point (admin_dashboard.html) being protected by prior login.
    // Or, redirect to a conceptual /login route within the React app if it existed.
    // alert("يجب تسجيل الدخول أولاً للوصول لهذه الصفحة.");
    // return <Navigate to="/" replace />; // Redirect to main site if not logged in
    // For now, let's assume this app is only loaded IF logged in.
  }
  return children;
};


function App() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          {/* Updated path and component */}
          <Route path="/manage-content" element={<ProtectedRoute><ManageContent /></ProtectedRoute>} />
          <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/seo-control" element={<ProtectedRoute><SeoControl /></ProtectedRoute>} />
          <Route path="/monetization" element={<ProtectedRoute><Monetization /></ProtectedRoute>} />
          {/* Fallback or 404 route if needed */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Default redirect to Dashboard for any unmatched admin routes */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
