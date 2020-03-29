const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');
class mailer {
  async sendMail(email,token){

   /**
   * HTML EMail Template Generator
   */
   emailConfiguration = {
     subject: "Account verification",
     receiverName : "Nobbie",
     subTitle : "Account verification",
     mainTitle : "Account verification",
     mailContent : `please verify your email using the verification
     button below.`,
     buttonLink : "http://localhost:3000/verify?" + token,
     buttonText : "verify"
   }

   let generalConfiguration = {
     supportEmail: "support@example.com",
     companyName: "NetObjex Inc",
     companyLogo: "https://www.netobjex.com/wp-content/themes/netobjex-4/images/nO_Logo.png"
   }

   let htmlContent = emailTemplate.htmlTemplateGenerator(emailConfiguration, generalConfiguration);

   // Provide SMTP Account Information
   let account = {
     name: 'no-replay',
     user:'no-replay@demo.com'
   };


   var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
   var mailOptions = {
     from: account.name + '<no-reply@example.com>',
     to: email,
     subject: 'Account Verification',
     html: htmlContent
   };
   transporter.sendMail(mailOptions, function (err) {
     if (err) { return response.status(500).send({ msg: err.message }); }
     return response.status(200).send({status: 'sucess', message: 'A verification email has been sent to ' + email + '.'});
   });

  }
}

module.exports = {
  mailer
};
