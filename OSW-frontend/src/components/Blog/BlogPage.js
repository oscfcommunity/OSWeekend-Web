import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import blogData from "./BlogData";
import "./BlogPage.css";
import Profile from "../../img/blank-profile.png";
import { deepOrange } from "@mui/material/colors";
import Navbar from "../Navbar";

const BlogPage = () => {
  const { id } = useParams();
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [underlineWidth, setUnderlineWidth] = useState("100%");

  const selectedBlog = blogData.find((blog) => blog.id.toString() === id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop <= window.innerHeight / 2) {
        setScrollOpacity(1);
        setImageScale(1);
        setUnderlineWidth("100%"); // Keep the full underline width when at the top of the page
      } else {
        setScrollOpacity(1 - (scrollTop - window.innerHeight / 2) / 400);
        setImageScale(1 - (scrollTop - window.innerHeight / 2) / 800);
        setUnderlineWidth(
          `${100 - (scrollTop - window.innerHeight / 2) / 10}%`
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!selectedBlog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="blog-page fade-in">
      <div className="author-section">
        <Avatar
          src={Profile}
          sx={{ bgcolor: deepOrange[500] }}
          style={{ verticalAlign: "middle" }}
        />
        <h2 className="author-name">{selectedBlog.authorName}</h2>
      </div>
      <div className="blog-section">
        <img
          className="blog-photo"
          src={selectedBlog.blogImg}
          alt="Blog Header"
          style={{
            transform: `scale(${imageScale})`,
            opacity: scrollOpacity,
          }}
        />
        <div className="blog-content">
          <h1
            className={`blog-title scrolling-underline`}
            style={{ "--underline-width": underlineWidth }}
          >
            {selectedBlog.blogTitle}
          </h1>
          <div
            className="blog-text"
            dangerouslySetInnerHTML={{ __html: selectedBlog.blogContent }}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default BlogPage;
