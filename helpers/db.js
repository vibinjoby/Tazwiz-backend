const mongo = require("mongoose");
const bcrypt = require("bcrypt");

// prod-mode
//${process.env.DB_USERNAME}
//${process.env.DB_PASSWORD}
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-acs6q.mongodb.net/online_poll?retryWrites=true&w=majority`;

mongo
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongodb..."))
  .catch(err => console.log("Unable to connnect to mongodb", err));

// Load the models
const Users = require("../models/users");

/**
 *
 * @param {*} emailId
 * Check if the email already exists in mongodb
 */
async function checkEmailExists(emailId) {
  const result = await Users.findOne({
    email: { $regex: emailId, $options: "i" }
  });
  if (result) return true;
  return false;
}

/**
 *
 * @param {*} emailId
 * @param {*} password
 *
 * Validating the sign in credentials
 */
async function validateForSignIn(emailId, password) {
  let result = await Users.findOne({
    email: emailId
  });
  if (result) {
    const isAuthPassword = await bcrypt.compare(password, result.password);
    if (isAuthPassword) {
      result.password = undefined;
      return JSON.stringify(result);
    }
  }
  return null;
}

/**
 *
 * @param {*} body
 * Saving the user details for signing up
 */
async function createNewAccount(name, email, password) {
  //Initialize the boolean to false
  const isEmailConfirmed = false;
  //Generate salt for hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the password before saving to DB
  const hashedPwd = await bcrypt.hash(password, salt);
  const users = await Users.create({
    name,
    email,
    password: hashedPwd,
    isEmailConfirmed
  });

  await users.validate();

  await users.save();
}

async function updateUserMailConfirmation(emailId) {
  // Find the document with email and update the is email confirmed to true
  const updatedData = await Users.findOneAndUpdate(
    { email: emailId },
    { isEmailConfirmed: true }
  );
  return updatedData;
}

module.exports = {
  checkEmailExists,
  validateForSignIn,
  createNewAccount,
  updateUserMailConfirmation
};
