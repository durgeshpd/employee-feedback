import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FeedbackForm from "./components/FeedbackForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Navbar token={token} />

      <div className="container mx-auto p-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Routes>
            <Route path="/" element={<FeedbackForm />} />

            <Route
              path="/admin/login"
              element={token ? <Navigate to="/admin" /> : <AdminLogin setToken={setToken} />}
            />

            <Route
              path="/admin"
              element={token ? <AdminDashboard token={token} logout={handleLogout} /> : <Navigate to="/admin/login" />}
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
