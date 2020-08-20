# Tazwiz-backend


## Deployed Url: https://tazwiz-backend.herokuapp.com

### Login (POST)

<b>URL:</b> https://tazwiz-backend.herokuapp.com/login

<b>Body:</b> username, password

<b>Expected Response:</b> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xfdXNlcl9pZCI6MTcsImNvbF91c2VyX25hbWUiOiJ2aWJpbjciLCJjb2xfdXNlcl9lbWFpbCI6IjM2NDciLCJjb2xfdXNlcl9jcmVhdGVkX2RhdGUiOjIwMjAsImNvbF90ZW1wX3Bhc3N3b3JkIjoiIiwiaWF0IjoxNTk2NjgyOTA3fQ.wfss_txfA2nMC6zdVbt4uSoQNYxo-00nD5TsSWeW5vk(JWT Token)

### Check Email (GET)

<b>URL:</b> https://tazwiz-backend.herokuapp.com/checkEmail/:email

<b>Expected Response:</b> Email doesnt exist

### Create Account (POST)

<b>URL:</b> https://tazwiz-backend.herokuapp.com/createAccount/

<b>Body:</b> name, email, password

<b>Expected Response:</b> Account created successfully!!

### Confirmation EMAIL (POST)

<b>URL:</b> https://tazwiz-backend.herokuapp.com/confirmationEmail/

<b>Body:</b> username, toEmail

<b>Expected Response:</b> Email sent successfully!!

### Confirmation EMAIL (GET)

<b>URL:</b> https://tazwiz-backend.herokuapp.com/urlRedirect/:email

<b>Expectation</b> Redirect to tazwiz://confirmation/:email inside the mobile app

### Confirm User Registration (POST)

<b>URL:</b> https://tazwiz-backend.herokuapp.com/confirmUserRegistration/:email

<b>Body:</b> username, toEmail

<b>Expected Response:</b> {isEmailConfirmed:true}



