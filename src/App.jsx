import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar";
import Login from "./components/login";
import Register from "./components/register";
import ForgetPassword from "./components/forgetPassword";
import ResetPassword from "./components/resetNewPassword";
import ResetNew from "./components/resetPassword";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route >
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Navbar />} />
            <Route path="/reset-new" element={<ResetNew/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;