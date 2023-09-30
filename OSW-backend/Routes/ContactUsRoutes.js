const { ContactUs } = require("../Controller/ContactController");

const contactUsRoutes = (app) => {
  app.post("/user/contactus", ContactUs);
};

module.exports = contactUsRoutes;
