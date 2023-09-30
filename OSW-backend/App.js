require("./Database/Connection");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const express = require("express");
const path = require("path");

const logger = require("morgan"); // for logging requests , status codes and more.....

const app = express();
const PORT = process.env.PORT;

// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());

// Serve static files from the 'uploads' folder -- temporary
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(logger("dev"));

require("./Routes/AdminRoutes")(app);
require("./Routes/AuthRoutes")(app);
require("./Routes/BlogRoutes")(app);
require("./Routes/ContactUsRoutes")(app);
require("./Routes/EventRoutes")(app);
require("./Routes/NotificationRoutes")(app);
require("./Routes/ProfileRoutes")(app);
require("./Routes/ResourceLibraryRoutes")(app);
require("./Routes/SpeakerRoutes")(app);
require("./Routes/TeamRoutes")(app);
require("./Routes/VerfiyRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT}`);
});
