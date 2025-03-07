require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// Load environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CONFIGURED_EMAIL = process.env.CONFIGURED_EMAIL;

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
