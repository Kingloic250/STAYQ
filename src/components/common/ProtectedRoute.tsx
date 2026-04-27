import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/data/mock";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
}

export function ProtectedRoute({ allowedRoles, redirectTo = "/login", children }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "agent") return <Navigate to="/agent/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
