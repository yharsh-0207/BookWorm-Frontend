import React from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

export const Login = () => {
  const [loginDetails, setLogInDetails] = useState({});
  let navigate = useNavigate();
  const handleChange = (event) => {
    setLogInDetails((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let details = JSON.stringify(loginDetails);
    //document.write("Hello World");
    fetch("http://localhost:8080/api/Login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: details,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        if (result) {
          sessionStorage.setItem("isLoggedIn", true);
          const isLoggedIn= sessionStorage.getItem('isLoggedIn');
          alert("Login Success!!");
          navigate("Homelogin");
        } else {
          alert("Login Failed!!");
          navigate("/");
        }
        
      });
      
  };

  return (
    <div className="signup">
      <div classname="header">
        <div className="text">LOGIN</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="forgot-password">
          Forgot Password?<span>Click Here!</span>
        </div>
        <div className="submit-container">
          <input type="submit" value="LogIn" className="submit" />
          <a href="/Signup">
            <input type="submit" value="SignUp" className="submit" />
          </a>
        </div>
      </form>
    </div>
  );
};
