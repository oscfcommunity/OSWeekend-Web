const Blog = require("../Models/Blog");

exports.GetBlogById = async (req, res) => {
  const blogId = req.params.id;

  try {
    let blog;
    // if (req.userType === "user") {
    blog = await Blog.findById(blogId).populate({
      path: "user_author",
      select: "profile.first_name profile.last_name profile.profile_pic",
    });
    // } else {
    //   blog = await Blog.findById(blogId).populate({
    //     path: "admin_author",
    //   });
    // }

    if (!blog) {
      console.warn("here");
      return res
        .status(404)
        .json({ success: false, message: "Blog not found !!" });
    }

    if (blog.user_author) {
      console.log(blog);
      const blogData = {
        ...blog._doc,
        user_author:
          blog.user_author.profile.first_name +
          " " +
          blog.user_author.profile.last_name,
        profile_pic: blog.user_author.profile.profile_pic,
      };
      return res.status(200).json({ success: true, blogData });
    } else {
      const blogData = {
        ...blog._doc,
        admin_author: "admin",
      };
      return res.status(200).json({ success: true, blogData });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

exports.GetPersonalBlogs = async (req, res) => {
  try {
    let blogs;
    if (req.userType === "user") {
      blogs = await Blog.find({ user_author: req.user._id }).populate({
        path: "user_author",
        select: "profile.first_name profile.last_name profile.profile_pic",
      });
    } else {
      blogs = await Blog.find({ admin_author: req.user._id }).populate({
        path: "admin_author",
      });
    }

    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found !!" });
    }

    // console.log(blogs[0].author);
    if (req.userType === "user") {
      const blogsData = blogs.map((blog) => {
        const blogData = {
          ...blog._doc,
        };

        if (blog.user_author) {
          blogData.user_author =
            blog.user_author.profile.first_name +
            " " +
            blog.user_author.profile.last_name;
          blogData.profile_pic = blog.user_author.profile.profile_pic;
        }
        return blogData;
      });
      return res.status(200).json({ success: true, blogsData });
    }
    const blogsData = blogs.map((blog) => {
      const blogData = {
        ...blog._doc,
      };
      if (blog.admin_author) {
        blogData.admin_author = "Admin";
      }
      return blogData;
    });
    console.log(blogsData);
    return res.status(200).json({ success: true, blogsData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.GetBlogs = async (req, res) => {
  try {
    let blogs;
    // if (req.userType === "user") {
    blogs = await Blog.find().populate({
      path: "user_author",
      select: "profile.first_name profile.last_name profile.profile_pic",
    });
    // } else {
    //   blogs = await Blog.find().populate({
    //     path: "admin_author",
    //   });
    // }

    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found !!" });
    }

    // console.log(blogs[0].author);
    const blogsData = blogs.map((blog) => {
      const blogData = {
        ...blog._doc,
      };

      if (blog.user_author) {
        blogData.user_author =
          blog.user_author.profile.first_name +
          " " +
          blog.user_author.profile.last_name;
        blogData.profile_pic = blog.user_author.profile.profile_pic;
        return blogData;
      } else {
        const blogData = {
          ...blog._doc,
        };
        if (blog.admin_author) {
          blogData.admin_author = "admin";
        }
        return blogData;
      }
    });
    return res.status(200).json({ success: true, blogsData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.CreateBlog = async (req, res) => {
  try {
    const user = req.user;

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content is require to create a blog !!!",
      });
    }
    if (req.userType === "user") {
      const newBlog = new Blog({
        title,
        content,
        user_author: user._id,
      });
      const createdBlog = await newBlog.save();
      return res.status(200).json(createdBlog);
    }
    const newBlog = new Blog({
      title,
      content,
      admin_author: user._id,
    });
    const createdBlog = await newBlog.save();
    return res.status(200).json(createdBlog);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

exports.UpdateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, blogUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content is require to create a blog !!!",
      });
    }
    let blog;
    if (req.userType === "user") {
      blog = await Blog.findById(blogId).populate(
        "user_author",
        "profile.first_name" + "profile.last_name"
      );
    } else {
      blog = await Blog.findById(blogId).populate("admin_author");
    }

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Found." });
    }

    if (title) {
      blog.title = title;
    }

    if (content) {
      blog.content = content;
    }

    if (blogUrl) {
      blog.blogUrl = blogUrl;
    }

    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    if (req.userType === "user") {
      const blogData = {
        ...updatedBlog._doc,
        user_author:
          updatedBlog.user_author.profile.first_name +
          updatedBlog.user_author.profile.last_name,
      };
      return res.status(200).json({ success: true, blogData });
    }
    const blogData = {
      ...updatedBlog._doc,
      admin_author: "Admin",
    };
    return res.status(200).json({ success: true, blogData });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

exports.DeleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

exports.uploadFile = (req, res) => {
  console.log(req.userType);

  if (!req.fileUrl) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const fileUrl = req.fileUrl;
  return res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    url: fileUrl,
  });
};
