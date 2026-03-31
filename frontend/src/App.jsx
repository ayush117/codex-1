import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

function ProtectedLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <JobsPage />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/applications"
        element={
          <PrivateRoute>
            <ProtectedLayout>
              <ApplicationsPage />
            </ProtectedLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}
