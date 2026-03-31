import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center">Loading session...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}
