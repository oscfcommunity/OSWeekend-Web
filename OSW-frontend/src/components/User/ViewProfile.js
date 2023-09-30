import React, { useEffect, useState } from "react";
import "./ViewProfile.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import profile_img from "../../img/profile-img.jpg";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewProfile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profile_img);
  const [user_name, setUserName] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [contactno, setContactno] = useState();
  const [is_verified, setVerfied] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(true);
  const [showotpinput, setShowotpInput] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [otp, setOtp] = useState();
  const location = useLocation();
  const [userId, setUserId] = useState(
    location.state ? location.state.userId : "" || ""
  );
  const [userType, setUserType] = useState("");
  const [profileData, setProfileData] = useState(null);
  // const [isImageChanged, setIsImageChanged] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userAuthToken")) {
      const token = localStorage.getItem("userAuthToken");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken._id);
      setUserType(decodedToken.type);
    } else {
      const token = localStorage.getItem("adminAuthToken");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken._id);
      setUserType(decodedToken.type);
    }
  }, []);
  const handleImageChange = (e) => {
    const pics = e.target.files[0];

    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     setSelectedImage(e.target.result);
    //   };
    //   setIsImageChanged(true); // Set the state variable to true indicating the image has been changed

    //   console.log(e.target.result);
    //   reader.readAsDataURL(file);
    // }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Open Source Weekend");
      data.append("cloud_name", "darsh-cloud");
      fetch("https://api.cloudinary.com/v1_1/darsh-cloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedImage(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const openModal = () => {
    setIsProfileOpen(true);
  };
  const closeModal = () => {
    setIsProfileOpen(false);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${hostname}/user/profile/${userId}`);
        const data = await response.json();
        if (data.success) {
          setProfileData(data.data);
        } else {
          console.log(data.message);
          throw new Error("Failed to Get Profile. Please Reload");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPic = async () => {
      console.log(userId);
      try {
        const response = await fetch(`${hostname}/user/profile-pic/${userId}`);

        const res = await response.json();
        console.log(res);
        setSelectedImage(res.LogoURL);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId && userId !== "") {
      fetchPic();
      fetchUserProfile();
    }
  }, [userId]);
  useEffect(() => {
    if (profileData) {
      console.log(profileData);
      setUserName(profileData.user_name);
      setEmail(profileData.email);
      setFname(profileData.profile.first_name);
      setLname(profileData.profile.last_name);
      setContactno(profileData.contact_no);
      setVerfied(profileData.is_verified);
    }
  }, [profileData]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user_name, email, lname, fname);
    if (!user_name || !email || !lname || !fname) {
      return;
    }
    // logo upload start
    // const logoData = new FormData();
    // if (isImageChanged) {
    //   const ProfilePicFile = new File([selectedImage], "profile_pic.jpg");
    //   console.log(ProfilePicFile);
    //   logoData.append("file", ProfilePicFile);

    //   const logoUploadRes = await fetch(
    //     `http://localhost:4000/user/upload-pic`,
    //     {
    //       method: "POST",
    //       headers: {
    //         authorization: localStorage.getItem("userAuthToken"),
    //       },
    //       body: logoData,
    //     }
    //   );
    //   const logoRes = await logoUploadRes.json();

    //   console.log(logoRes);
    // }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: localStorage.getItem("userAuthToken"),
        },
      };

      const response = await fetch(`${hostname}/user/addprofile`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
          user_name: user_name,
          first_name: fname,
          last_name: lname,
          email: email,
          pic: selectedImage,
          contact_no: contactno,
        }),
      });

      if (response.ok) {
        toast("Profile Added SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        console.log(response);

        navigate("/profile", { replace: true });
      } else {
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "red",
        });
        throw new Error("Error occurred during registration");
      }
    } catch (error) {
      toast("Error Occured!", {
        position: "top-right",
        backgroundColor: "red",
      });
    }
  };

  const handleverifyemail = async (e) => {
    e.preventDefault();
    setShowotpInput(false);
    setOtp();
    if (!email || email.trim() === "") {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }
    const data = { email: email };

    try {
      const response = await fetch(
        `${hostname}/user/email-verification/sendotp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("userAuthToken"),
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast("Otp sent SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        setShowOtpButton(false);
        setShowotpInput(true);
        setShowVerifyButton(true);
      } else {
        const errorData = await response.json();
        toast("Error Occured!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.log(errorData);
      }
    } catch (error) {
      toast("Error Occured!", {
        position: "top-right",
        backgroundColor: "red",
      });
    }
  };
  const VerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: localStorage.getItem("userAuthToken"),
        },
      };

      const response = await fetch(
        `${hostname}/user/email-verification/verify`,
        {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      if (response.ok) {
        toast("Verified SuccessFully!", {
          position: "top-right",
          backgroundColor: "green",
        });
        setShowotpInput(false);
        setShowVerifyButton(false);
        setShowOtpButton(true);
        setVerfied(true);
      } else {
        const errorData = await response.json();
        toast("Error Occured.Try Again!", {
          position: "top-right",
          backgroundColor: "red",
        });
        console.log(errorData);
        throw new Error("Failed to verify. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      toast("Error Occured.Try Again!", {
        position: "top-right",
        backgroundColor: "red",
      });
      return; // Prevent further execution
    }
  };
  return (
    <div>
      <Navbar />
      <div className="profile-con">
        <div className="profile-card">
          <div className="profile-card-img">
            <img
              src={selectedImage}
              className="profile-image rounded-circle"
              alt=""
            />
          </div>
          <div className="profile-username">
            <p>{user_name}</p>
          </div>
          {userType === "user" && (
            <span className="edit-button" onClick={openModal}>
              <i class="fa-solid fa-pen-to-square"></i>
            </span>
          )}
        </div>
      </div>
      {isProfileOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            {/* Your form content goes here */}
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
              }}
            >
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  maxWidth: "20%",
                  borderRadius: "50%",
                  marginBottom: "20px",
                }}
              />
              <div className="form-field">
                <label>Profile Photo: </label>
                <input type="file" onChange={handleImageChange} />
              </div>
              <div className="form-field">
                <label>Username:</label>
                <input
                  type="text"
                  value={user_name}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {userType === "user" && showOtpButton && (
                  <>
                    {is_verified ? (
                      <span style={{ color: "green" }}>&#10004;</span>
                    ) : (
                      <button onClick={handleverifyemail}>Verify</button>
                    )}
                  </>
                )}
              </div>
              {showotpinput && (
                <div className="form-field">
                  <label>Enter OTP:</label>
                  <input
                    type="Number"
                    // value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}
              {showVerifyButton && (
                <button onClick={VerifyEmail}>Verify</button>
              )}

              <div className="form-field">
                <label>First Name:</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label>Contact No.:</label>
                <input
                  type="Number"
                  value={contactno}
                  onChange={(e) => setContactno(e.target.value)}
                  required
                />
              </div>
              <button
                className="modal-submit"
                type="submit"
                onClick={submitHandler}
              >
                Submit
                <ToastContainer />
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ViewProfile;
