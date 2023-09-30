const mongoose = require("mongoose");

const resourceLibrarySchema = mongoose.Schema({
  project_name: {
    type: String,
  },
  project_details: {
    type: String,
  },
  project_links: {
    type: String,
  },
  project_tags: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Resource = mongoose.model("Resource", resourceLibrarySchema);
module.exports = Resource;
