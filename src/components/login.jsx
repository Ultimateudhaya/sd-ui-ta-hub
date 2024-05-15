import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import CustomSnackbar from "./CustomSnackbar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarVariant, setSnackbarVariant] = useState('success');
    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setSnackbarOpen(true);
            setSnackbarMessage("Please fill all fields !");
            setSnackbarVariant("error");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
    
            if (!response.ok) {
                throw new Error("Failed to login");
            }
            setSnackbarOpen(true);
            setSnackbarMessage("Login success");
            setSnackbarVariant("success");
            setTimeout(() => {
                navigate('/dashboard'); 
            }, 2000);
            
        } catch (error) {
            console.error("Error logging in:", error.message);
            setSnackbarOpen(true);
            setSnackbarMessage("Error!! Please try again.");
            setSnackbarVariant("error");
        }
    };
    
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        setSnackbarMessage("");
      };
  
    return (
        <div className="image">
            <div className="left">
                <div className="animation-container">
                    <span className="word">t</span>
                    <span className="word">r</span>
                    <span className="word">i</span>
                    <span className="word">n</span>
                    <span className="word">g</span>
                    <span className="word">a</span>
                    <span className="word">p</span>
                    <span className="word">p</span>
                    <span className="word">s</span>
                </div>
                <div className="background-image"></div>
            </div>
            <div className="right">
                <div role="form" onKeyPress={(e) => { if (e.key === 'Enter') handleLogin(e); }}>
                    <form onSubmit={handleLogin}>
                        <div className="card1">
                                <div>
                                    <h1 className="gradient-text-login">Ta-HuB</h1>
                                </div>
                                <div className="form-container-login">
                                    <label htmlFor="email" className="Email">Email Address</label>
                                    <div className="input-container">
                                        <TextField
                                            className="input"
                                            id="filled-basic-email"
                                            variant="standard"
                                            type="text"
                                            name="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <label htmlFor="password" className="Email">Password</label>
                                    <div className="input-container">
                                        <TextField
                                            className="input"
                                            id="filled-basic-password"
                                            variant="standard"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <a href="/forget-password" className="login-href">
                                    Having trouble signing in?
                                </a>

                                <div className="checkbox">
                                    <input type="checkbox" id="remember-device" name="remember-device" className="checkbox" />
                                    <label htmlFor="remember-device">Remember this device</label>
                                </div>


                                <button type="submit" className="button-login">
                                    Sign In
                                </button>
                                <div className="or-divider">
                                    <div className="divider"></div>
                                    <span>Or</span>
                                    <div className="divider"></div>
                                </div>
                                <button className="google-signin-button">
                                    <span className="icon"></span>
                                    Continue with Google
                                </button>

                                <div className="login-secondary">
                                    <div className="text-center">
                                        <div className="link-container">
                                            <div className="link">New to TA-HUB?</div>
                                            <span>
                                                <a href="/register" className="signup">
                                                    Sign-up
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
            <CustomSnackbar
        message={snackbarMessage}
        variant={snackbarVariant}
        onClose={handleCloseSnackbar}
        open={snackbarOpen}
      />
        </div>
        
    );
}

export default Login;
