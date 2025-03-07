const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherPic: String,
  teacherId : String,
  teacherName: String,
  qualification: String,
  experience: String,
  status: String,
  type: String,
});

const studentSchema = new mongoose.Schema({
  StudentPic: String,
  StudentName: String,
  StudentFatherName: String,
  StudentMotherName: String,
  StudentContactNumber: String,
  StudentLoginID: String,
  StudentLoginPassword: String,
  StudentAddmissionDate: String,
  SchoolName: String,
  StudentAddress: String,
  status: String,
  type: String,
  Gender: String, 
  Class: {
    StudentID: String,
    StudentClassId: String, 
    StudentClassPassword: String,
    ClassStd: String,
    TotalFees: String,
    Subjects: [String],
    Teachers: [teacherSchema], 
  },
});

const StudentsModel = mongoose.model('StudentsModel', studentSchema);

module.exports = StudentsModel;


