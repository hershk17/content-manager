const express = require("express");
const testRoutes = require("./routes/test");
const mongoose = require("mongoose");
const db = require("../../config/keys").mongodbURI;

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, MERN stack!");
});

app.use("/test", testRoutes);

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (req.secure) next();
    else res.redirect(`https://'${req.headers.host}${req.url}`);
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error", err));
