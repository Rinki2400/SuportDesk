import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/auth/LoginForm';
import SigUpForm from './component/auth/SignupForm';
import AdminLogin from './component/auth/AdminLogin';
import Home from './component/Dashboad/Home';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SigUpForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Protected Route */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
