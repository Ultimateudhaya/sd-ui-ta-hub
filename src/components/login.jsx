import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../styles/login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const roleId = 1;

            // Construct the payload including roleId
            const payload = {
                ...formData,
                roleId: roleId // Add roleId to the payload
            };
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            // Reset the form after successful login
            setFormData({
                email: "",
                password: ""
            });

            // Redirect the user to the dashboard or another page upon successful login
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to login. Please check your credentials and try again.");
        }
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
                <div role="form" onKeyPress={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
                    <form onSubmit={handleSubmit}>
                        <div className="card1">
                            <div>
                                <h1 className="gradient-text-center">Ta-HuB</h1>
                            </div>
                            <div className="form-container-login">
                                <label htmlFor="email" className="Email">Email Address</label>
                                <div className="input-container">
                                    <TextField 
                                        className="input" 
                                        id="filled-basic-email" 
                                        variant="filled"
                                        type="text"
                                        name="email"
                                        placeholder="Email" 
                                        onChange={handleInputChange}
                                        value={formData.email}
                                    />
                                </div>

                                <label htmlFor="password" className="Email">Password</label>
                                <div className="input-container">
                                    <TextField 
                                        className="input" 
                                        id="filled-basic-password" 
                                        variant="filled"
                                        type="password"
                                        name="password"
                                        placeholder="Password" 
                                        onChange={handleInputChange}
                                        value={formData.password}
                                    />
                                </div>
                            </div>

                            <a href="/forget-password" className="forget">
                                Forget password?
                            </a>

                            <button type="submit" className="button-login">
                                Sign In
                            </button>
                            <div className="or-divider">
                                <div className="divider"></div>
                                <span>Or</span>
                                <div className="divider"></div>
                            </div>
                            <Button variant="outlined" className="google-signin-button"  startIcon={<FontAwesomeIcon icon={faGoogle} />}>
                                Sign in with Google
                            </Button>
                            <div className="login-secondary">
                                <div className="text-center">
                                    <div className="link-container">
                                        <div className="link">New to Ta-Hub?</div>
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
        </div>
    );
}

export default Login;
