import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Reviews from "./pages/Reviews";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

import "./styles/shared.css";
import "./styles/navbar.css";
import "./styles/footer.css";

import "./styles/extras.css";
import "./styles/reviews.css";
import "./styles/services.css";
import "./styles/forms-admin.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./styles/Booking.css"
import "./styles/Dashboard.css"


function App() {
  return (
    <BrowserRouter>

      <div className="appShell">
        <Navbar />

        <main className="main">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* 🔒 PROTECTED ROUTES */}
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        
      </div>
    </BrowserRouter>
  );
}

export default App;