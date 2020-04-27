var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../public/javascripts/loginScripts');
var ejs = require('ejs');

/* GET home page. */
router.get('/', auth.checkAuthenticated, (req, res) => {
  console.log("Current logged in user:");
  console.log(req.user);
  res.render('index');
  // res.render('index', { email: req.user.email });
})

router.get('/users', auth.checkAuthenticated, function(req, res, next) {
  res.render('users', { title: 'Users' });
});

router.get('/test', (req, res) => {
  res.render('emailTemplateTest', {summary: '<p>summary var shows up here</p>', snack: '<p>snack var shows up here</p>', lunch: '<p>lunch var shows up here</p>'});
});

router.post('/send-email', (req, res) => {
  var emails = [
    'add@test.com',
    'test@test.com',
    'emails@test.com',
    'here@test.com'
  ] //updated later to emails from db

  var names = [
    "second name example",
    "third name example",
    "fourth name example",
    "fifth name example",
  ] //updated later to parent names
  //add more options for various student info later

  async function sendEmail() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'cnp.dev.tester@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    for (var i = 0; i < emails.length; i++) {
      let info = await transporter.sendMail({
        from: '"Creative Nature Playschool" <cnp.dev.tester@gmail.com>', // sender address
        to: `${emails[i]}`, // list of receivers
        subject: "CNP Daily Report", // Subject line
        text: "", // plain text body
        html: await ejs.renderFile('./views/emailTemplate.ejs', {
          name: `${names[i]}`,
          email: `${emails[i]}`,
          message: 'Insert daily group message here'
        })
        
      });
      
      console.log("Message sent: %s", info.messageId);
    }

    res.redirect('/test');

  }

  try {
    sendEmail();
  } catch (e) {
    console.log(e);
    res.redirect('/test');
  }
});

module.exports = router;
