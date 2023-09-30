import React, { useState } from "react";
import "./AdminLogin.css";
import email_icon from "../..//img/email.png";
import password_icon from "../../img/password.png";
import { useNavigate } from "react-router-dom";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(email, password, isSuperadmin);
      const response = await fetch(`${hostname}/admin/add-newadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("adminAuthToken"),
        },
        body: JSON.stringify({ email, password, superadmin: isSuperadmin }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(token);
        navigate("/", { replace: true });
        toast(data.message, {
          position: "top-right",
          backgroundColor: "green",
        });
        console.log("Admin Added successful", data);
      } else {
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "red",
        });
        throw new Error("Error Adding Admin");
      }
    } catch (error) {
      toast("Error Occured!", {
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
          <div className="login-text">Add Admin</div>
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
          <div style={{ marginLeft: "6vw" }}>
            <label>
              <input
                type="checkbox"
                checked={isSuperadmin}
                onChange={() => setIsSuperadmin(!isSuperadmin)}
              />
              Make Superadmin
            </label>
          </div>
        </div>

        <button
          className="submit-button"
          type="submit"
          onClick={() => {
            handleLogin();
          }}
        >
          Add
          <ToastContainer />{" "}
        </button>
      </div>
    </div>
  );
};

export default AddAdmin;
