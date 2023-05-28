const express = require("express");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=> {
    res.render("home");
});

app.get("/menu", (req,res) => {
    res.render("menu");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/faq", (req, res) => {
    res.render("faq");
});


// Mailchimp Newsletter Submission

app.post("/subscribe", (req, res) => {
    console.log("Status Code : " + res.statusCode);
  
    const email = req.body.email;
  
    var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
        },
      ],
    };
  
    const jsonData = JSON.stringify(data);
  
    const url = `https://us11.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`;
  
    const options = {
      method: "POST",
      auth: `hansana:${process.env.MAILCHIMP_API_KEY}`,
    };
  
    const request = https.request(url, options, (response) => {
      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
  
    //   if (response.statusCode === 200) {
    //       res.send("Submission Successful!");
    //   } else {
    //       res.send("Something went wrong!");
    //   }


    });
  
    request.write(jsonData);
    request.end();
  
  });
  


app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("Cafesy is up & Running smoothly on locahost.")
});
