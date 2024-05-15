import { TextField } from "@mui/material";
import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/forgetPassowrd.css';

function ForgetPassword() {
    const [email, setEmail] = useState("");

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error("Failed to request reset link");
            }

            // Reset form fields or show a success message
        } catch (error) {
            console.error("Error requesting reset link:", error.message);
            // Handle error, e.g., display error message to the user
        }
    };

    


 return(
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
    <div role="form" onKeyPress={(e) => { if (e.key === 'Enter') handleForgetPassword(e); }}>
        <form onSubmit={handleForgetPassword}>
        <div className="card1">
        <div className="form-container-forget">
            <div>
            <h1 className="gradient-text-center">Forget your Password?</h1>
            </div>
            <p className="text-top">Please enter your email address you’d like your 
password reset information sent to </p>
            <div className="text">
            <label htmlFor="email" className="Email">Enter Email Address</label>
            <div className="input-container-forget">
                <TextField 
                className="input" 
                id="filled-basic-email" 
                variant="filled"
                type="text"
                name="email"
                placeholder="Email address" 
                onChange={(e) => setEmail(e.target.value)}

                />
            </div>
            </div>
            <a href="/reset-password" className="forget">
            Reset password?
            </a>

            
            <button className="button-forget">
            Request Resent link
            </button>

            <div className="login-secondary">
            <div className="text-center">
            <div className="link-container">
                <span>
                    <a href="/login" className="back-to-login">
                       Back to Login
                    </a>
                </span>
            </div>
            </div>
        </div>
        </div>
        </div>

        </form>
        </div>

    </div>
  </div>

 )   
}


export default ForgetPassword