const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');
const fillData={
  verify:{
    subject: "Account verification",
    subTitle: "Account verification",
    mainTitle: "Account verification",
    mailContent: `please verify your email using the verification button below.`,
    endPoint:'verify',
    btnText: "Verify",
    respMessage: 'A verification email has been sent to '
  },
  forgot:{
    subject: "Reset Password",
    subTitle: "Reset Password",
    mainTitle: "Reset Password",
    mailContent: `please click on the link given below to reset your password.`,
    endPoint:'reset',
    btnText: "Reset Password",
    respMessage: 'A password reset link has been sent to '
  }
}
class mailer {
  
  async sendMail(email, token, type) {
    return new Promise((resolve, reject) => {
      /**
  * HTML EMail Template Generator
  */
     const emailConfiguration = {
        subject: fillData[type].subject,
        receiverName: "Nobbie",
        subTitle: fillData[type].subTitle,
        mainTitle: fillData[type].mainTitle,
        mailContent: fillData[type].mailContent,
        buttonLink: "http://localhost:3000/api/v1/users/"+fillData[type].endPoint+"?token=" + token,
        buttonText: fillData[type].btnText
      }

      const generalConfiguration = {
        supportEmail: "support@example.com",
        companyName: "NetObjex Inc",
        companyLogo: "https://www.netobjex.com/wp-content/themes/netobjex-4/images/nO_Logo.png"
      }
      let htmlContent = emailTemplate.htmlTemplateGenerator(emailConfiguration, generalConfiguration);
      // Provide SMTP Account Information
      let account = {
        name: 'no-replay',
        user: 'no-replay@demo.com'
      };

      var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      var mailOptions = {
        from: account.name + '<no-reply@example.com>',
        to: email,
        subject: fillData[type].subject,
        html: htmlContent
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) { reject({message:err.message}) }
        resolve({message: fillData[type].respMessage + email + '.'})
      });
    })
  }
}

module.exports = new mailer();
