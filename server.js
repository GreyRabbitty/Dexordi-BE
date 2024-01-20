const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");

db.mongoose
  .connect(`mongodb+srv://liamcarlospolet1231:67rFjL5Isc1AS71s@cluster0.lfz6wid.mongodb.net/dexodi`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cybord" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/cbrc.routes")(app);
require("./app/routes/test.routes")(app);
// require("./app/routes/deepLake.routes")(app);
// require("./app/routes/brc20.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
