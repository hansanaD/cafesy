const express = require("express");
const router = express.Router();

const emailService = require("./emailService");
const adminEmail = "hansana123dasanayake@gmail.com";

router.get("/", (req, res) => {
  res.render("contact");
});

router.post("/", async (req, res) => {
  const contactformUserHTML = `<html><head> <style>a{color: #3C2A21;}.email-title{display: flex; justify-content: center; align-items: center; flex-direction: column; height: 200px; background-color: #1A120B; font-family: Arial, sans-serif; color: #fff;}.email-title .email-logo{height: 40px; margin-bottom: 10px;}.email-title p{font-size: 16px;}.email-content-wrapper{margin: 0 auto; width: 80%; padding: 50px; background-color: #fff; font-size: 18px;}p{font-family: Arial, sans-serif; line-height: 1.5; ;}footer{text-align: center; margin: 15px 0 30px 0; font-family: Arial, sans-serif; color: gray;}@media (max-width: 575.98px){.email-content-wrapper{margin: 0; width: unset;}}</style></head><body> <main> <div class="email-title"> <a href="https://cafesy.onrender.com/"><img class="email-logo" src="https://i.ibb.co/4mwrry0/Cafesy-Logo-Text-with-Icon-White.webp"></a> <p>Connected. Organic. Alive.</p></div><div class="email-content-wrapper"> <p>Hello ${req.body.userName} 👋,</p><p>Thank you for reaching out to us through our contact form and We appreciate your interests.</p><p>We have received your message and we will get back to you as soon as possible. Please allow us some time to review your inquiry and provide you with the best possible solution.</p><p>In the meantime, you can check out our social media for more information and updates.</p><p>We look forward to hearing from you soon. </p><p>Sincerely,</p><p>Hansana Dasanayaka<br>Owner & Founder<br>Cafésy<br></p></div></main> <footer>© 2023 <a href="https://cafesy.onrender.com/">Cafésy</a>. All rights reserved.</footer></body></html>`;
  const contactformAdminHTML = `<html> <head> <style>a{text-decoration: none;}.email-content-wrapper{margin: 0 auto; width: 80%; padding: 50px; background-color: #fff; font-size: 18px;}p, h2{font-family: Arial, sans-serif; color: black;}footer{text-align: center; margin: 15px 0 30px 0; font-family: Arial, sans-serif; color: gray;}@media (max-width: 575.98px){.email-content-wrapper{margin: 0; width: unset;}}</style> </head> <body> <main> <div class="email-content-wrapper"> <h2><u>New Contact Form Submission</u></h2> <p><b>- Phone:</b> ${req.body.userPhone}</p><p><b>- Email:</b> ${req.body.userEmail}</p><p><b>- Name:</b> ${req.body.userName}</p><p><b>- Message:</b> ${req.body.userMessage}</p></div></main> <footer>© 2023 <a href="#">Cafésy</a>. All rights reserved.</footer> </body></html>`;

  try {
    await emailService.sendEmail(
      req.body.userEmail,
      "Thanks for Reaching Out to Cafesy!",
      contactformUserHTML
    );

    await emailService.sendEmail(
      adminEmail,
      "New Contact Form Submission!",
      contactformAdminHTML
    );

    res.render("newsletter-status", {
      title: "We will back to you soon! ",
      heading: "Email Sent!",
      message: "Thank you for contacting us! We'll get back to you soon.",
      status_icon: "success-tick",
    });
  } catch (error) {
    res.render("newsletter-status", {
      title: "Oops! Something went wrong!",
      heading: "Email Sent Failed!",
      message: `ERROR ${response.statusCode} : An error occurred.`,
      status_icon: "failure-cross",
    });
  }
});

module.exports = router;
