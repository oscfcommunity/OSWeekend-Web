import React, { useState } from "react";
import "./contactUsForm.css";
import { hostname } from "../../hostname";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const regexEmail = /^[\w_.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/i;
    const regexName = /^[A-Za-z\s]+$/gi
    const name=formData.name.trim();
    if (!regexName.test(name)){
      toast('Invalid Name Format', {
        type: 'warning',
        position: 'top-center',
        autoClose: 3000,
        closeButton: true
      });
      return false;
    }
    
    if (!regexEmail.test(formData.email)){
      toast('Invalid Email Format', {
        type: 'warning',
        position: 'top-center',
        autoClose: 3000,
        closeButton: true
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()){
      return;
    }
    try {
      const response = await fetch(`${hostname}/user/contactus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Uncomment this line
        },
        body: JSON.stringify(formData),
      });


      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data.message);
      // Reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section className="mb-4">
      <ToastContainer />
      <h2 className="h1-responsive font-weight-bold text-center my-4">
        Contact us
      </h2>
      <p className="text-center w-responsive mx-auto mb-5">
        Do you have any questions? Please do not hesitate to contact us
        directly. Our team will come back to you within a matter of hours to
        help you.
      </p>

      <div className="row">
        <div className="col-md-9 mb-md-0 mb-5">
          <form id="contact-form" name="contact-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="md-form mb-0">
                  <label htmlFor="name" className="">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="md-form mb-0">
                  <label htmlFor="email" className="">
                    Your email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="e.g.:abc123@gmail.com"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="subject" className="">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="subject here..."
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <label htmlFor="message">Your message</label>
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    rows="2"
                    placeholder="your message..."
                    className="form-control md-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="text-center text-md-left">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </div>
            <div className="status"></div>
          </form>
        </div>
        <div className="col-md-3 text-center">
          <ul className="list-unstyled mb-0">
            <li>
              <i className="fas fa-map-marker-alt fa-2x"></i>
              <p>San Francisco, CA 94126, USA</p>
            </li>
            <li>
              <i className="fas fa-phone mt-4 fa-2x"></i>
              <p>+ 01 234 567 89</p>
            </li>
            <li>
              <i className="fas fa-envelope mt-4 fa-2x"></i>
              <p>contact@mdbootstrap.com</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
