# node-email
An sample app for sending email using NodeJS and the mailgun service.

## Usage
You need to add a config.js file to the root folder and it should have the following structure:

```javascript
module.exports = function config(){
  return {
    MAILGUN_API_KEY:"YOUR-API-KEY",
    MAILGUN_EMAIL:"YOUR-API-EMAIL",
    MAILGUN_SMTP_CONFIG:{
      user: 'SMTP-USER',
      pass: 'SMTP-PASSWORD'
    },
    MAILGUN_SMTP_EMAIL:'SMTP-EMAIL',
    RECEPIENT:'RECEPIENT-EMAIL'
  }
};
```
Note that the app relies on the mailgun service so you can sign up at [mailgun.com](http://www.mailgun.com) to use their api. After you sign up, obtain the API and SMPT credentials.

After that install all needed packages by running ``` npm install ```.

Then just run the app using the command ``` npm start ``` on the terminal and view it in the browser at ``` http://localhost:3000/ ```
