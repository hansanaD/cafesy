const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");

require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/contact", contactRoutes);

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.use(newsletterRoutes);

app.listen(3000 || process.env.PORT, (req, res) => {
  console.log("Cafesy is up & Running smoothly on locahost.");
});
