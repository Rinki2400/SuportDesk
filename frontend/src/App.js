import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/LoginForm";
import SignUpForm from "./component/auth/SignupForm"; // ✅ Fixed typo
import AdminLogin from "./component/auth/AdminLogin";
import Home from "./component/Dashboad/Home";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoutes";
import AdminDashboard from "./component/Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminTicket from "./component/Admin/AdminTicket";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/manage-tickets"
          element={
            <AdminRoute>
              <AdminTicket />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
