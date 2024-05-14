import { TextField } from "@mui/material";
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/register.css';

function Register() {
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
            <h1 className="gradient-text-center">Sign up</h1>
            </div>
            <div className="form-container-register">
            <label htmlFor="userName" className="Email">User Name</label>
            <div className="input-container">
                <TextField 
                className="input" 
                id="filled-basic-user" 
                variant="filled"
                type="text"
                name="userName"
                placeholder="User name" 
                />
                {/* You can add an icon or any other element here */}
            </div>
            <label htmlFor="phoneNo" className="Email">Mobile No</label>
            <div className="input-container">
                <TextField 
                className="input" 
                id="filled-basic-mobile" 
                variant="filled"
                type="text"
                name="phoneNo"
                placeholder="Mobile No" 
                />
                {/* You can add an icon or any other element here */}
            </div>

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

            <label htmlFor="password" className="Email">New Password</label>
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

            <label htmlFor="password" className="Email">Confirm Password</label>
            <div className="input-container">
                <TextField 
                className="input" 
                id="filled-basic-conpassword" 
                variant="filled"
                type="password"
                name="password"
                placeholder="Confirm Password" 
                />
                {/* <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span> */}
            </div>
            </div>
            
            <button className="button-register">
            Sign In
            </button>
        </div>


        </form>
        </div>

    </div>
  </div>

 )   
}


export default Register