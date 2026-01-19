import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginForm 
              onLoginSuccess={() => {
                setRefreshKey((prev) => prev + 1);
              }} 
            />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard 
              key={refreshKey}
              onLogout={() => {
                setRefreshKey((prev) => prev + 1);
              }} 
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
