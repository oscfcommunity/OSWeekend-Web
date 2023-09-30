import React, { useState } from "react";
import "./contactUsForm.css";
import { hostname } from "../../hostname";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name" className="">
                    Your name
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="md-form mb-0">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="">
                    Your email
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <label htmlFor="subject" className="">
                    Subject
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="md-form">
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    rows="2"
                    className="form-control md-textarea"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message">Your message</label>
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
