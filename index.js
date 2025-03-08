  const express = require('express')
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose')
  const cors = require('cors')
  // require('dotenv').config();
  const { sendMail } = require('./Controllers/gmailAPI');

// const router = express.Router();
const notice_images_controller = require('./Controllers/notice_images_controller')
const teacher_controller = require('./Controllers/teacher_controller')
const students_controller = require('./Controllers/students_controller')
const adminController = require('./Controllers/admin_creds_controllers');
const studentList_controller = require('./Controllers/studentList_controller');
const subject_controller = require('./Controllers/subject_controller');
const classStructure = require('./Controllers/classes_controller');
const launchExam_controller = require('./Controllers/launchedExam_controller');
const marks_controller = require('./Controllers/marks_controller');
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
    cb(null, 'students/'); // Directory where the uploaded files will be stored
  },
  filename: function (req, files, cb) {
    // Access userName from the request body (ensure it's sent in the request)
    const userName = req.body.userName || 'default'; // Fallback to 'default' if userName is not available
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    
    // Use the userName and add a unique suffix to the file name
    cb(null, userName + '-' + uniqueSuffix + path3.extname(files.originalname));
  }
});


const upload = multer({ storage: storage });
const teacher = multer2({ storage: storage2 });
const student = multer3({ storage: storage3 });

const app = express()

app.use(cors(
  {
    origin:["http://localhost:3001"],
    methods:["POST","GET","OPTIONS"],
    credentials:true
  }
))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/upload' , express.static('upload'))
app.use('/teacher' , express.static('teacher'))
app.use('/students' , express.static('students'))


mongoose.connect('mongodb+srv://scienceacademy:science2025@cluster0.thqvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
})
.then(async () => {
  console.log('DB successfully Connected');
// Call the function during server startup
(async () => { 
  try {
      await classStructure.classStructure();
      console.log('Class structure initialized.');
  } catch (error) {
      console.error('Error initializing class structure:', error.message);
  }
})(); 
})
.catch(err => {
  console.log('DB Error:', err); 
});

// Define your routes here

app.get('/', (req, res) => {
 return res.send('This is keshav jha from Server!')
})

app.get('/api/notice_images', notice_images_controller.getNoticeImg);
app.post('/api/notice_images', upload.array('notice', 5), notice_images_controller.addNoticeImg);
app.delete('/api/notice_images/:id', notice_images_controller.deleteNotice);

app.post('/api/students', student.single('imgFile'), students_controller.addStudent);
app.get('/api/studentsList',studentList_controller.getStudentList)

app.get('/admin/adminLogins', adminController.getAdmins);
app.post('/admin/adminLogins', adminController.loginAdmins);   

app.post('/api/teachers', teacher.array('teacherPic', 1), teacher_controller.addTeacher);
app.get('/api/teachers', teacher_controller.getTeacher);
app.put('/api/teachers/update/:id',teacher.array('teacherPic', 1),teacher_controller.updateTeacher)
app.delete('/api/teachers/:id', teacher_controller.deleteTeacher);
app.use("/teacher", express.static(path.join(__dirname, "teacher")));

app.post('/api/subjects',subject_controller.addSubject);
app.get('/api/subjectsDetails',subject_controller.getSubjectDetails);
app.put('/api/subjects/:id', subject_controller.updateSubject);
app.delete('/api/subjects/:id',subject_controller.deleteSubject);

app.get('/api/classData',classStructure.getclassData);

app.post('/api/launchExams',launchExam_controller.launchExam)
app.get('/api/getLaunchedExam',launchExam_controller.getLaunchedExam);

app.post('/api/addMarks',marks_controller.addMarks);

app.post('/api/emails', async (req, res) => {
  console.log('📧 Email request received');

  try {
    const { userEmail, userName, userMessage } = req.body;

    if (!userEmail || !userName || !userMessage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Inquiry Email to Admin
    await sendMail({
      from: `${userName} <${userEmail}>`,
      to: 'yabhay1521@gmail.com', // Admin Email
      subject: 'Inquiry',
      html: `<p>${userMessage}</p>`,
    });

    // Auto-responder Email to User
    await sendMail({
      from: 'yabhay1521@gmail.com',
      to: userEmail,
      subject: 'Science Academy 🏫',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <h1 style="color: #007bff;">Dear ${userName},</h1>
            <p>Thank you for your response.</p>
            <p>Our team will get back to you soon!</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>Science Academy</p>
            <img src="https://i.ibb.co/6yJ8xHK/logo.jpg" alt="logo" width="150">
          </body>
        </html>
      `,
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

const port = 5000;
app.listen(port, () =>{ 
  console.log(`Server re-started on port ${port}`)
}); 
