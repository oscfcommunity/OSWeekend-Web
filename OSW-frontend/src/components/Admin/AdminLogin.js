import React, { useState } from "react";
import "./AdminLogin.css";
import email_icon from "../..//img/email.png";
import password_icon from "../../img/password.png";
import { useNavigate } from "react-router-dom";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${hostname}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data;
      if (response.ok) {
        data = await response.json();
        const { result } = data;
        localStorage.setItem("adminAuthToken", result);
        toast("Login SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        // console.log(token);
        navigate("/", { replace: true });
        console.log("Login successful", data);
      } else {
        toast(data.message, {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Login failed", data);
      }
    } catch (error) {
      toast("Error Occured during Login.", {
        position: "top-right",
        backgroundColor: "red",
      });
      console.error("An error occurred during login", error);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-con">
        <div className="submit-container">
          {/* <div className={action==='LogIn' ? 'submit gray':'submit'} onClick={() => {setaction("Sign Up")}}>Sign Up</div> */}
          {/* <div className={action==='Sign Up' ? 'submit gray': 'submit'} onClick={() => {setaction("LogIn")}}>Admin LogIn</div> */}
        </div>
        <div className="header">
          <div className="login-text">Admin Login</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img className="login-img" src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img className="login-img" src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="forgot-password">
          Forgot Password?{" "}
          <span
            onClick={() => {
              navigate("/adminforgotpassword");
            }}
          >
            Click Here!
          </span>
        </div>

        <button
          className="submit-button"
          type="submit"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
          <ToastContainer />
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
