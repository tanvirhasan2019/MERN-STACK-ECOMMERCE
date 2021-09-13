const mailgun = require('../config/mailgun');
const template = require('../config/template');
const Feedback = require('../services/EmaiTemplate/Feedback');
const ProductPage = require('../services/EmaiTemplate/ProductPage');

require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


exports.sendEmail = async (email, type, host, data) => {
  let result;
  let response;

  
  const messages = prepareTemplate(type, host, data);

  if(type == 'newsletter-send'){
      var maillist = [
        ...data.users
      ];

      var EmailOptions = {
        from: process.env.EMAIL,
        to: maillist,
        subject: "Tanshen Technology",
        text: "",
        html: messages
      };


  }else{
      var EmailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Tanshen Technology",
        text: "",
        html: messages
      };
  }
 


  

  try{

    const createTransporter = async () => {
      const oauth2Client = new OAuth2(
        process.env.client_id,
        process.env.client_secret,
        "https://developers.google.com/oauthplayground"
      );
    
      oauth2Client.setCredentials({
        refresh_token: process.env.refresh_token
      });
    
      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject("Failed to create access token :(");
          }
          resolve(token);
        });
      });

  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          accessToken,
          clientId: process.env.client_id,
          clientSecret: process.env.client_secret,
          refreshToken: process.env.refresh_token
        }
      });
    
      return transporter;
    };
    

   
    const sendEmail = async (EmailOptions) => {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(EmailOptions);

    };
    
    if(type == 'newsletter-send'){

      var maillist = [
        ...data.users
      ];

      sendEmail({
          subject: "Tanshen Technology",
          text: '',
          to: maillist,
          from: process.env.EMAIL,
          html: messages
        });  
        
    }else{
      sendEmail({
        subject: "Tanshen Technology",
        text: '',
        to: email,
        from: process.env.EMAIL,
        html: messages
      });  
    }
    


  }catch(err){

  }

};

const prepareTemplate = (type, host, data) => {

  let message;

  switch (type) {
    case 'reset':

      var subject = 'Reset Password';
      var messagebody = 'Please Reset Your account';
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      var link = data;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'reset-confirmation':

    var subject = 'Password Chamged';
      var messagebody = `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'signup':

      var subject = 'Account Registration';
      var messagebody = `Thank you for creating an account with us!.`
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'merchant-signup':

      var subject = 'Merchant Registration';
      var messagebody =  `${
        'Congratulations! Your application has been accepted. Please complete your Merchant account signup by clicking on the link below. \n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://'
      }${host}/merchant-signup/${data.resetToken}?email=${data.email}\n\n`
    
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'merchant-welcome':
      message = template.merchantWelcome(data);
      break;

    case 'newsletter-subscription':

      var subject = 'Newsletter';
      var messagebody = 'Thanks For your Subscribe.You will get updated on time';
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'contact':

      var subject = 'Feedback';
      var messagebody = 'Thanks For your Feedback. We Will contact you soon.';
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      
      break;

    case 'merchant-application':

      var subject = 'Sell on Tanshen Technology';
      var messagebody = 'We received your request! Our team will contact you soon';
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'order-confirmation':

      var subject = `Order Confirmation ${data._id}`;
      var messagebody =  `Your Order Number is ${data._id}. Thank you for your order!. \n\n` +
      `We've received your order and will contact you as soon as your package is shipped. \n\n`
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = Feedback(subject, messagebody, link, contact)
      break;

    case 'newsletter-send':
      var link = process.env.BASE_CLIENT_URL;
      var contact = 'Phone: '+process.env.Contact_phone;
      message = ProductPage(data, contact, link)
      break;

    default:
      message = ''; 
  }

  return message;
};

