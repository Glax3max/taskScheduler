import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../lib/auth.js";

/**
 * Simple route guard.
 *
 * If you don't have a token, you can't see the dashboard.
 * (We still handle token expiry server-side by clearing token on 401s.)
 */
export function ProtectedRoute({ children }) {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

