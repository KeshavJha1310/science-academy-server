const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs = require('fs');

// const router = express.Router();
const notice_images_controller = require('./Controllers/notice_images_controller')
const teacher_controller = require('./Controllers/teacher_controller')
const students_controller = require('./Controllers/students_controller')
const adminController = require('./Controllers/admin_creds_controllers');
const studentList_controller = require('./Controllers/studentList_controller');

// const studentModel = require('./Models/students_model');

const multer = require('multer');
const multer2 = require('multer');
const multer3 = require('multer');
const path = require('path');
const path2 = require('path');
const path3 = require('path');
const { getStudentList } = require('./Controllers/studentList_controller');
// const upload = multer({ dest: 'upload/' });
// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'upload/'); // The directory where the uploaded files will be stored
  },
  filename: function (req, files, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, files.fieldname + '-' + uniqueSuffix + path.extname(files.originalname));
  },
});

const storage2 = multer2.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'teacher/'); // The directory where the uploaded files will be stored
  },
  filename: function (req, files, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, files.fieldname + '-' + uniqueSuffix + path2.extname(files.originalname));
  },
});
const storage3 = multer3.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'students/'); // The directory where the uploaded files will be stored
  },
  filename: function (req, files, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, files.fieldname + '-' + uniqueSuffix + path3.extname(files.originalname));
  },
});


const upload = multer({ storage: storage });
const teacher = multer2({ storage: storage2 });
const students = multer3({ storage: storage3 });

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/upload' , express.static('upload'))
app.use('/teacher' , express.static('teacher'))
app.use('/students' , express.static('students'))


mongoose.connect('mongodb://127.0.0.1:27017/mydata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
})
.then(() => {
  console.log('DB successfully Connected');
   // Delete all documents from the collection
  //  studentModel.deleteMany({})
  //  .then((result) => {
  //    console.log(`${result.deletedCount} documents deleted`);
  //  })
  //  .catch((error) => {
  //    console.error('Error deleting documents:', error); 
  //  })
})
.catch(err => {
  console.log('DB Error:', err);
});

// Define your routes here

app.get('/', (req, res) => {
 return res.send('This is keshav jha from Server!')
})

app.post('/api/notice_images', upload.array('notice', 5), notice_images_controller.addNoticeImg);
app.post('/api/teachers', teacher.array('teacherPic', 5), teacher_controller.addTeacher);
app.post('/api/students', students.array('StudentPic', 5), students_controller.addStudent);
// app.get('/api/notice_images_path', notice_images_controller.addNoticeImg);
app.get('/api/notice_images', notice_images_controller.getNoticeImg);
app.get('/api/teachers', teacher_controller.getTeacher);
app.get('/api/studentsList',studentList_controller.getStudentList)
// app.get('/api/notice_images', admin_login_model.getNoticeImg);
app.get('/admin/adminLogins', adminController.getAdmins);
app.post('/admin/adminLogins', adminController.loginAdmins);   
// app.post('/admin/addadmins', adminController.addAdmins);
app.delete('/api/notice_images/:id', notice_images_controller.deleteNotice);
app.delete('/api/teachers/:id', teacher_controller.deleteTeacher);

// Gmail API credentials
const CLIENT_ID = '99224369334-m490b79jpv5uk9c8r78tltsi8np9d14d.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04RmX_7rPLvFdCgYIARAAGAQSNwF-L9IrDVS4mYNvBxrpmcqYwXVtt71r1QuoqwkE3jUwXE2WNZm7tL6CQC5xEeFPNKxmvLl9kA0'

const CLIENT_ID1 = '99224369334-m490b79jpv5uk9c8r78tltsi8np9d14d.apps.googleusercontent.com'
const CLIENT_SECRET1 = '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'
const REDIRECT_URL1 = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN1 = '1//04RmX_7rPLvFdCgYIARAAGAQSNwF-L9IrDVS4mYNvBxrpmcqYwXVtt71r1QuoqwkE3jUwXE2WNZm7tL6CQC5xEeFPNKxmvLl9kA0'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL,REFRESH_TOKEN) 
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN })

const oAuth2Client1 = new google.auth.OAuth2(CLIENT_ID1,CLIENT_SECRET1,REDIRECT_URL1,REFRESH_TOKEN1) 
oAuth2Client1.setCredentials({refresh_token1 : REFRESH_TOKEN1 })

app.post('/api/emails',async (req, res) => {
  console.log("Email Function")
  try {
    // Get the access token
    const accessToken = await oAuth2Client.getAccessToken();
    const accessToken1 = await oAuth2Client.getAccessToken();
    const { userEmail, userName, userMessage } = req.body; // Get user's email, name, and message from the request body
    console.log(userEmail)
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
  console.log("Email endpoint")
          
        // Email options (customize as needed)
        const mailOptions = {
          from: `${userName} <${userEmail}>`, // Use user's name and email as the "from" address
          to: 'yabhay1521@gmail.com', // Recipient's email address
          subject: 'Inquiry',
          text: userMessage, // Use the user's message as the email text
          html: `<p>${userMessage}</p>`, // Use the user's message as HTML content
        };

      // Send the email
      const result = await transport.sendMail(mailOptions);
      console.log('Email sent:', result);

const responder = nodemailer.createTransport({
  service: 'Gmail' ,
  auth: {
    type: 'OAuth2',
    user: 'keshavjha2737@gmail.com', // Your Gmail email address
    clientId: CLIENT_ID1,
    clientSecret: CLIENT_SECRET1,
    refreshToken: REFRESH_TOKEN1,
    accessToken: accessToken1,
},
tls: {
    rejectUnauthorized: false,
},

});

// const logoPath = 'C:\\Users\\Keshav Jha\\Desktop\\science_academy-node\\science_academy-node\\upload\\logo.JPG';
// const logoData = fs.readFileSync(logoPath);
// const logoBase64 = logoData.toString('base64');
// console.log(logoBase64)

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    h1 {
      color: #007bff;
      font-size: 24px;
      margin-bottom: 20px;
    }
    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 20px;
    }
    @media screen and (max-width: 600px) {
      h1 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <h1>Dear ${userName},</h1>
  <p>Thank you for your response.</p>
  <p>Our team will get back to you soon!</p>
  <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
  <p>Best regards,<br>Science Academy</p>
  <img src="https://i.ibb.co/6yJ8xHK/logo.jpg" alt="logo" border="0">
</body>
</html>

`;

const respondermailOptions = {
  from: 'yabhay1521@gmail.com' , // Use user's name and email as the "from" address
  to: `${userName} <${userEmail}>`, // Recipient's email address
  subject: 'Science Academy🏫',
  html: htmlContent, // Use the user's message as HTML content
 // attachments: attachments,
};

// Send the email
const responder_result = await responder.sendMail(respondermailOptions);
console.log('Email sent:', responder_result);

      res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Email sending failed' });
  }

  })
const port = process.env.PORT || 5000; // replace 5000 with your prchreferred port number
app.listen(port, () =>{ 
  console.log(`Server re-started on port ${port}`)
});
