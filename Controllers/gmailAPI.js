const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '99224369334-m490b79jpv5uk9c8r78tltsi8np9d14d.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04RmX_7rPLvFdCgYIARAAGAQSNwF-L9IrDVS4mYNvBxrpmcqYwXVtt71r1QuoqwkE3jUwXE2WNZm7tL6CQC5xEeFPNKxmvLl9kA0'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL,REFRESH_TOKEN) 
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN })
// Function to send an email
async function sendMail() {
    try {
        // Get the access token
        const accessToken = await oAuth2Client.getAccessToken();

        // Create a Nodemailer transport
        const transport = nodemailer.createTransport({
            service: 'Gmail', // Use 'Gmail' here
            auth: {
                type: 'OAuth2',
                user: 'keshavjha2737@gmail.com', // Your Gmail email address
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Email options
        const mailOptions = {
            from: 'Science Academy 🏫 <keshavjha2737@gmail.com>',
           // to: 'yabhay1521@gmail.com', // Recipient's email address
           to: 'yabhay1521@gmail.com',
            subject: 'Subject of the email',
            text: 'Hello, this is a test email from Gmail API.',
            html: '<h1>Hello, this is a test email from Gmail API.</h1>',
        };

        // Send the email
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

// Call the sendMail function
sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.error('Error:', error.message));