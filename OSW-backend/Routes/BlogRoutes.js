const { GetBlogs, GetBlogById, CreateBlog, UpdateBlog, DeleteBlog, uploadFile, GetPersonalBlogs } = require("../Controller/BlogController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const fileUploaderMiddleware = require("../Middlewares/fileUploaderMiddleware");
const blogmediaUploaderMiddleware = fileUploaderMiddleware("blog");

const BlogRoutes = (app) => {
  // media routes : auth required
  app.get("/blogs", GetBlogs);
  app.get("/personal-blogs", AuthMiddleware, GetPersonalBlogs);
  app.get("/blog/:id", GetBlogById);
  app.post("/blog/createblog", AuthMiddleware, CreateBlog);
  app.put("/blog/updateblog/:id", AuthMiddleware, UpdateBlog);
  app.delete("/blog/deleteblog/:id", AuthMiddleware, DeleteBlog);

  // Helper route for uploading images for media posts
  app.post(
    "/blog/upload",
    AuthMiddleware,
    blogmediaUploaderMiddleware,
    uploadFile
  );
};

module.exports = BlogRoutes;
