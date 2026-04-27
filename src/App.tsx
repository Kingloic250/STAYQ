import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";

// Layouts
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AgentLayout } from "@/components/layout/AgentLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Auth
import Login from "@/pages/auth/Login";

// User pages
import Home from "@/pages/user/Home";
import Search from "@/pages/user/Search";
import PropertyDetail from "@/pages/user/PropertyDetail";
import Favorites from "@/pages/user/Favorites";
import UserMessages from "@/pages/user/Messages";
import UserViewings from "@/pages/user/Viewings";
import UserProfile from "@/pages/user/Profile";

// Agent pages
import AgentDashboard from "@/pages/agent/Dashboard";
import AgentListings from "@/pages/agent/Listings";
import AddProperty from "@/pages/agent/AddProperty";
import AgentViewings from "@/pages/agent/Viewings";
import AgentMessages from "@/pages/agent/Messages";
import AgentProfile from "@/pages/agent/Profile";

// Admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProperties from "@/pages/admin/Properties";
import AdminViewings from "@/pages/admin/Viewings";
import AdminUsers from "@/pages/admin/Users";
import AdminReports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="realhaven-theme">
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<Login />} />

              {/* User routes (public + authenticated) */}
              <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="property/:id" element={<PropertyDetail />} />
                <Route
                  path="favorites"
                  element={
                    <ProtectedRoute allowedRoles={["user", "agent", "admin"]}>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserMessages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="viewings"
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserViewings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Agent routes */}
              <Route
                path="agent"
                element={
                  <ProtectedRoute allowedRoles={["agent"]}>
                    <AgentLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/agent/dashboard" replace />} />
                <Route path="dashboard" element={<AgentDashboard />} />
                <Route path="listings" element={<AgentListings />} />
                <Route path="add-property" element={<AddProperty />} />
                <Route path="viewings" element={<AgentViewings />} />
                <Route path="messages" element={<AgentMessages />} />
                <Route path="profile" element={<AgentProfile />} />
              </Route>

              {/* Admin routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="viewings" element={<AdminViewings />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
