const express = require("express");
const router = express.Router();
const db = require("../helpers/db");
const mail = require("../helpers/mail");

router.get("/checkEmail/:email", (req, res) => {
  const { email } = req.params;
  // First level validation for required params in URL
  if (!email)
    return res.status(400).send("email is a mandatory field in the params");

  // Then check if the email exists in DB
  db.checkEmailExists(email).then(result => {
    const response = {
      output: result ? "Email already exists" : "Email doesnt exist"
    };
    res.send(response);
  });
});

router.post("/createAccount", (req, res) => {
  const { name, email, password } = req.body;
  // First level validation for required params from body
  if (!name || !email || !password)
    return res
      .status(400)
      .send("name, email and password are mandatory fields");
  try {
    // Create new account by calling mongo
    db.createNewAccount(name, email, password).then(() => {
      res.send({ output: "Account created successfully!!" });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong in the server");
  }
});

router.post("/confirmationEmail", (req, res) => {
  try {
    const { username, toEmail } = req.body;
    // First level validation for required params from body
    if (!username || !toEmail)
      return res.status(400).send("username and toEmail are mandatory fields");
    // Then send email to the recepient with the email template
    mail.sendMail(username, toEmail);
    res.send("Email sent successfully!!");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong in the server" + error);
  }
});

router.get("/urlRedirect", (req, res) => {
  res.writeHead(302, {
    Location: "tazwiz://"
    //add other headers here...
  });
  res.end();
});

router.post("/confirmUserRegistration/:username", (req, res) => {
  try {
    // Check if the username is present
    // Confirm the user with successful registration
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
