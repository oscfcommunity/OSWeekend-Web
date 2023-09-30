import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Blogs.css";
import { Link } from "react-router-dom";
import blogData from "./BlogData";
import "aos";
import "aos/dist/aos.css";

const Blogs = () => {
  
  useEffect(() => {
    // Initialize AOS
    const aos = require("aos");
    aos.init({
      once: false,
      duration: 1000,
    }); // Use 'once' to trigger animation only once

    // Refresh AOS when the component updates
    aos.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog-card-page">
        <div className="top_section"></div>
        <header className="blog-header">
          <h1>Blogs</h1>
          <Link to="/post-blogs">
            <button className="add-blog-button">Add Blog</button>
          </Link>
        </header>
        <section className="blog-intro">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            optio, corporis eaque, maiores consequatur repellat, nesciunt
            distinctio natus nihil praesentium voluptatem. Expedita,
            perspiciatis ut tempore neque vitae illo accusantium sit.
          </p>
        </section>
        <section className="blog-cards">
          {blogData.map((blog) => (
            <div className="blog-card" key={blog.id} data-aos="zoom-in">
              <img src={blog.blogImg} alt={blog.authorName} />
              <h2>{blog.blogTitle}</h2>
              <Link to={`/BlogPage/${blog.id}`}>
                {" "}
                <button className="read_more" style={{ fontSize: "15px" }}>
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
