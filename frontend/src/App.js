import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/auth/LoginForm";
import SigUpForm from "./component/auth/SignupForm";
import AdminLogin from "./component/auth/AdminLogin";
import Home from "./component/Dashboad/Home";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoutes";
import AdminDashboard from "../src/component/Admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SigUpForm />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
