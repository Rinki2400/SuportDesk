import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/auth/LoginForm';
import SigUpForm from './component/auth/SignupForm';
import AdminLogin from './component/auth/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SigUpForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
