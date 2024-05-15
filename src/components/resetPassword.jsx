import { TextField } from "@mui/material";
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/resetPassword.css';

function ResetPassword() {
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
        <div className="form-container-reset">
            <div>
            <h1 className="gradient-text-reset">Reset Password</h1>
            </div>
            <p className="text-top">Strong passwords includes numbers, letters
and punctuation marks. </p>
            <div className="text">
            <label htmlFor="password" className="Email"> Enter Old Password</label>
            <div className="input-container-reset">
                <TextField 
                className="input" 
                id="filled-basic-password" 
                variant="filled"
                type="password"
                name="password"
                placeholder="Old Password" 
                />
                {/* <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span> */}
            </div>
            <label htmlFor="password" className="Email">Enter New Password</label>
            <div className="input-container-reset">
                <TextField 
                className="input" 
                id="filled-basic-oldpassword" 
                variant="filled"
                type="password"
                name="password"
                placeholder="New Password" 
                />
                {/* <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span> */}
            </div>

            <label htmlFor="password" className="Email">Enter Confirm Password</label>
            <div className="input-container-reset">
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
            <button className="button-reset">
            Submit
            </button>
        </div>
        </div>

        </form>
        </div>

    </div>
  </div>

 )   
}


export default ResetPassword