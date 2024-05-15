import { TextField } from "@mui/material";
import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        userName: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: ""
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

            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            // Reset the form after successful registration
            setFormData({
                userName: "",
                phoneNo: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            alert("Registration successful!");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register. Please try again.");
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
    <div role="form" onKeyPress={(e) => { if (e.key === 'Enter') e.preventDefault(); }}>
    <form onSubmit={handleSubmit}>
         <div className="card1">
            <div>
            <h1 className="gradient-text-sign">Sign up</h1>
            </div>
            <div className="form-container-register">
            <label htmlFor="userName" className="UserName">User Name</label>
            <div className="input-container">
                <TextField 
                className="input" 
                id="filled-basic-user" 
                variant="filled"
                type="text"
                name="userName"
                placeholder="User name" 
                onChange={handleInputChange}

                />
                {/* You can add an icon or any other element here */}
            </div>
            <label htmlFor="phoneNo" className="PhoneNo">Mobile No</label>

            <div className="input-container">
                <TextField 
                className="input" 
                id="filled-basic-mobile" 
                variant="filled"
                type="number"
                name="phoneNo"
                onChange={handleInputChange}


                placeholder="Phone No" 

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
                onChange={handleInputChange}

                />
                {/* You can add an icon or any other element here */}
            </div>

            <label htmlFor="password" className="NewPassword">New Password</label>
            <div className="input-container">
                <TextField 
                className="input" 
                id="filled-basic-password" 
                variant="filled"
                type="password"
                name="password"
                onChange={handleInputChange}

                placeholder="New Password" 

                />
                {/* <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span> */}
            </div>

            <label htmlFor="confirmPassword" className="confirmPassword">Confirm Password</label>
            <div className="input-container">
            <TextField 
                                        className="input" 
                                        id="filled-basic-conpassword" 
                                        variant="filled"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password" 
                                        onChange={handleInputChange}
                                    />
                {/* <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span> */}
            </div>
            </div>
            
            <button type="submit"  className="button-register">
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