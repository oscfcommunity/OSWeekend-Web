import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import password_icon from "../../img/password.png";
import { hostname } from "../../hostname";
const ForgetPassword = () => {
  const [confirmPass, setConfirm_Pass] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleBackLogin = () => {
    navigate("/login");
  };

  const forgotPassword = async () => {
    if (!confirmPass || !password) {
      console.error("Please Enter Both Fields");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const currentUrl = new URL(window.location.href);

      const _id = currentUrl.searchParams.get("_id");
      const resetToken = currentUrl.searchParams.get("resetToken");
      const exp_time = currentUrl.searchParams.get("expiationTime");

      const response = await fetch(
        `${hostname}/user/reset-password/${_id}/${resetToken}/${exp_time}`,
        {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            password: password,
            confirm_password: confirmPass,
          }),
        }
      );

      if (response.ok) {
          const data = await response.json();
          console.log("Password Changed Successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occured while changing the password",error);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-con">
        <div className="header">
          <div className="login-text">Reset Password</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img className="login-img" src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input">
            <img className="login-img" src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirm_Pass(e.target.value)}
            />
          </div>

          <button
            className="submit-button"
            type="submit"
            onClick={() => {
              forgotPassword();
            }}
          >
            Submit
          </button>
          <span
            style={{
              fontFamily: "'Open Sans', sans-serif;",
              fontSize: "18px",
              display: "flex",
              justifyContent: "flex-end",
              color: "#0E8388",
              paddingRight: "40px",
              cursor: "pointer",
            }}
            onClick={handleBackLogin}
          >
            Back to Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;