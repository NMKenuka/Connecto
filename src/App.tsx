import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { theme } from "./theme/theme";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import BookingManagement from "./components/admin/BookingManagement";
import NoticeManagement from "./components/admin/NoticeManagement";
import UserDashboard from "./components/user/UserDashboard";
import BookingDetails from "./components/user/BookingDetails";
import MyBookings from "./components/user/MyBookings";
import ProfileSettings from "./components/common/ProfileSettings";
import Forum from "./components/user/Forum";
import AnalyticsPage from "./components/admin/AnalyticsPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/bookings"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <BookingManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/notices"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <NoticeManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AnalyticsPage />
                    </ProtectedRoute>
                  }
                />

                {/* User Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="user">
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booking/:id"
                  element={
                    <ProtectedRoute requiredRole="user">
                      <BookingDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-bookings"
                  element={
                    <ProtectedRoute requiredRole="user">
                      <MyBookings />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/forum"
                  element={
                    <ProtectedRoute requiredRole="user">
                      <Forum />
                    </ProtectedRoute>
                  }
                />

                {/* Default Redirects */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
