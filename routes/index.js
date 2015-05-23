var express = require('express');
var path = require('path');
var router = express.Router();
var nodemailer = require('nodemailer');
var premailer = require('premailer-api');
var emailTemplates = require('email-templates');
var templatesDir   = path.resolve('email_templates');
var MailGun = require('mailgun').Mailgun;
var config = require(path.resolve('config.js'));

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index',{
    title:'NodeJS Mail',
    content:"This is a simple app I created to test how to send mail in NodeJS using nodemailer, email-templates and the premailer-api package."
  });
});

router.get('/with-mail-gun', function(req, res, next){
  console.log(MailGun);
  var mg = new MailGun(config.MAILGUN_API_KEY);
  var recepients = [config.RECEPIENT];
  var sender = config.MAILGUN_API_KEY;
  var subject = 'A More Serious Email';
  var text = 'This is cool.';

  var callback = function(err) {
      if(err){
        res.json(err.message);
      }else{
        res.json("Email Sent.")
      }
  };

  mg.sendText(sender,recepients,subject,text,callback);
});


router.get('/mg-and-emailtemplates',function(res, req, next) {

  emailTemplates(templatesDir, function(err, template) {
   
    if (err) {
      console.log(err);
    } else {
       var locals = {
        email: config.RECEPIENT,
        url: 'http://www.example.com/account/confirm-email'
      };
      // Send a single email
      template('confirm-email', locals, function(err, html, text) {
        if (err) {
          res.send(err);
        } else {
          //send email
          var mg = new MailGun(config.MAILGUN_API_KEY);
          var recepients = [config.RECEPIENT];
          var sender = config.MAILGUN_EMAIL;
          var subject = 'Confirm Email';
          var text = html;

          var callback = function(err) {
              if(err){
                res.send(err.message);
              }else{
                res.send("Email Sent.");
              }
          };

          mg.sendText(sender,recepients,subject,text,callback);
        }
      });
    }
  });

})

//Send simple email
router.get('/simple-email', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("Templates dir is: ", templatesDir);

  var transport = nodemailer.createTransport("SMTP",{
    service: 'MailGun',
    auth: config.MAILGUN_SMTP_CONFIG
  });

  emailTemplates(templatesDir, function(err, template) {
   
    if (err) {
      console.log(err);
    } else {
   
    var locals = {
      email: config.RECEPIENT,
      url: 'http://www.example.com/account/confirm-email'
    };
   
      // Send a single email
      template('confirm-email', locals, function(err, html, text) {
        if (err) {
          res.send(err);
        } else {
          transport.sendMail({
            from: config.MAILGUN_SMTP_EMAIL,
            to: locals.email,
            subject: 'Please confirm your e-mail address',
            html: html
          }, function(err, info) {
            if (err) {
              res.json(err.message);
            } else {
              res.json(info);
            }
          });
        }
      });
    }
  });

});

module.exports = router;
