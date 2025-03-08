require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Load environment variables
const CLIENT_ID = '99224369334-m490b79jpv5uk9c8r78tltsi8np9d14d.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04PTZFLgo35IvCgYIARAAGAQSNwF-L9IroEwhm7PN_I0vjLKlCCTDKh2NknsRSI1Cx4Fj0PLTNkNfTUInMtYLHW6hFbjhCUaHytg';
const CONFIGURED_EMAIL = 'keshavjha2737@gmail.com';

// Configure OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Function to get access token
const getAccessToken = async () => {
  try {
    const { token } = await oAuth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error("❌ Error retrieving access token:", error);
    throw new Error("Failed to retrieve access token");
  }
};

// Function to send an email
const sendMail = async ({ from, to, subject, html }) => {
  try {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: CONFIGURED_EMAIL,
        pass: 'advr xskn afse ainw',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = { from, to, subject, html };
    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to ${to}`);
    return result;
  } catch (error) {
    console.error(`❌ Email sending failed: ${error.message}`);
    throw new Error('Email sending failed');
  }
};

module.exports = { sendMail };
