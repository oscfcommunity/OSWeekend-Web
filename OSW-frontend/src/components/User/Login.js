import React, { useState } from "react";
import "./Login.css";
import user_icon from "../../img/person.png";
import email_icon from "../../img/email.png";
import password_icon from "../../img/password.png";
import { GoogleLogin } from "react-google-login";
import eye_icon from "../../img/show.png";
import cancel_eye_icon from "../../img/hide.png";
import { useNavigate } from "react-router-dom";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientId =
  "574757039734-2hfvakv45d24o82mp3r80akqri2b70mq.apps.googleusercontent.com";

const Login = () => {
  const [action, setaction] = useState("LogIn");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigate = useNavigate();
  // Handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (actions) => {
    if (actions === "Sign Up") {
      if (!username || !email || !password || !confirmPassword) {
        toast("Fill All Details!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Please fill all the details");
        return;
      }
      if (password !== confirmPassword) {
        toast("PassWord Does not match!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Password and Confirm-Password does not match");
        return;
      }
      let response;
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        response = await fetch(`${hostname}/user/signup`, {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            user_name: username,
            email: email,
            password: password,
            confirm_password: confirmPassword,
          }),
        });

        if (response.ok) {
          toast("SignUp Successful!", {
            position: "top-right",
            backgroundColor: "green",
          });
          const data = await response.json();

          const { result } = data;
          localStorage.setItem("userAuthToken", result);
          navigate("/", { replace: true });
        } else {
          const data = await response.json();
          toast(data.message, {
            position: "top-right",
            backgroundColor: "red",
          });
          throw new Error("Error occurred during registration");
        }
      } catch (error) {
        toast(error, {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Error in SignUp:", response.message);
      }
    } else {
      if (!email || !password) {
        toast("Fill All Details!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Please fill all the details");
        return;
      }

      let response;
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        response = await fetch(`${hostname}/user/login`, {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (response.ok) {
          toast("Login SuccessFul!", {
            position: "top-right",
            backgroundColor: "green",
          });
          const data = await response.json();

          const { result } = data;
          localStorage.setItem("userAuthToken", result);
          navigate("/", { replace: true });
        } else {
          const data = await response.json();

          toast(data.message, {
            position: "top-right",
            backgroundColor: "red",
          });
          throw new Error("Error occurred during registration");
        }
      } catch (error) {
        console.log(response);
        toast(error, {
          position: "top-right",
          backgroundColor: "red",
        });
        console.error("Error in Login:", response);
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const onSuccess = async (res) => {
    console.log("LOGIN SUCCESS! Current User: ", res.profileObj);
    const User = res.profileObj;
    let response;
    if (action === "Sign Up") {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        response = await fetch(`${hostname}/user/google-signup`, {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            user_name: User.name,
            email: User.email,
            first_name: User.givenName,
            last_name: User.familyName,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const { result } = data;
          localStorage.setItem("userAuthToken", result);
          console.log(response);
          navigate("/", { replace: true });
        } else {
          throw new Error("Error occurred during registration");
        }
      } catch (error) {
        console.error("Error in SignUp:", error);
      }
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        response = await fetch(`${hostname}/user/googlelogin`, {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            email: User.email,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          const { result } = data;
          localStorage.setItem("userAuthToken", result);
          navigate("/", { replace: true });
        } else {
          throw new Error("Error occurred during registration");
        }
      } catch (error) {
        console.error("Error in Login:", response.message);
      }
    }
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILURE! res: ", res);
  };
  const forgotPassword = async () => {
    if (!email) {
      console.log("Please enter the registerd email");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch(`${hostname}/user/forgotPassword`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Password change link sent successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occured while send link.please try again");
    }
  };
  return (
    <div className="login-bg">
      <div className="login-con">
        <div className="submit-container">
          <div
            className={action === "LogIn" ? "submit gray" : "submit"}
            onClick={() => {
              setaction("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setaction("LogIn");
            }}
          >
            LogIn
          </div>
        </div>
        <div className="header">
          <div className="login-text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {action === "LogIn" ? (
            <div></div>
          ) : (
            <div className="input">
              <img className="login-img" src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <img className="login-img" src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img className="login-img" src={password_icon} alt="" />
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <img
              className="password-toggle"
              src={showPassword ? cancel_eye_icon : eye_icon} // Toggle eye icons
              alt={showPassword ? "hide" : "show"}
              onClick={() => togglePasswordVisibility("password")}
            />
          </div>
          {action === "LogIn" ? (
            <div></div>
          ) : (
            <div className="input">
              <img className="login-img" src={password_icon} alt="" />
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle input type
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              <img
                className="password-toggle"
                src={showConfirmPassword ? cancel_eye_icon : eye_icon} // Toggle eye icons
                alt={showConfirmPassword ? "hide" : "show"}
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            </div>
          )}
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            Forgot Password? <span onClick={forgotPassword}>Click Here!</span>
          </div>
        )}

        {/* <div className="submit-button"> */}
        <button
          className="submit-button"
          type="submit"
          onClick={() => {
            handleSubmit(action);
          }}
        >
          {action}
          <ToastContainer />
        </button>
        {/* <div></div> */}
        {/* </div> */}

        <div className="signInButton">
          <GoogleLogin
            clientId={clientId}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
