import './App.css'
import Login from './components/login'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './components/register';
import ForgetPassword from './components/forgetPassword';
import ResetPassword from './components/resetPassword';

function App() {
 

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    
  )
}

export default App
