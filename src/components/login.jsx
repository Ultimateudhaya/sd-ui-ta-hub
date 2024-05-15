import { TextField } from "@mui/material";
// import { useState } from "react";
import '../styles/login.css';

function Login() {
//    const [showPassword, setShowPassword] = useState(false);

    


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
    <div role="form" onKeyPress={(e) => { if (e.key === 'Enter'); }}>
        <form>
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
                />
                {/* You can add an icon or any other element here */}
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
                />
                {/* <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span> */}
            </div>
            </div>


            <a href="/forget-password" className="login">
            Having trouble signing in?
            </a>

            
            <button className="button-login">
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

 )   
}


export default Login