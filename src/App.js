import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import ActiveOrders from "./pages/ActiveOrders";
import CompletedOrders from "./pages/CompletedOrder";
import ThemeToggle from "./components/ThemeToggle";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeToggle />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/active-orders"
          element={
            <ProtectedRoute>
              <ActiveOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed-orders"
          element={
            <ProtectedRoute>
              <CompletedOrders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};
export default App;

