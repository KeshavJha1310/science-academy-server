// const { constrainedMemory } = require('process');
const StudentsModel = require('../Models/students_model')
const teacherModel = require('../Models/teachers_model')
const fs = require('fs');

// Assuming you have a route or function for searching teachers with multiple subjects
const findTeachersWithSubjects = async (teacherName) => {
  
  try {
    const teachers = await teacherModel.find({ teacherName: { $in: teacherName } });
    console.log("these are the Teachers :- ", teachers)
    if (teachers.length > 0) {
     
      console.log("these are the Teachers :- ", teachers)
      return teachers;
    } else {
      // No teachers found for the specified subjects
  
      return "No teachers found for the specified subjects.";
    }
  } catch (error) {
    console.error('Error finding teachers:', error);
    throw error;
  }
};

module.exports.addStudent = async (req, res) => {
   
  console.log("file",req.file, "student info", req.body, 16); // Make sure req.files and req.body are defined and contain the expected data
    const files = req.file;
    const StudentName = req.body.userName;
    const StudentFatherName = req.body.fatherName;
    const StudentMotherName = req.body.motherName;
    const StudentContactNumber = req.body.contactNo;
    const StudentClassId = req.body.className;
    const StudentClassPassword = req.body.password;
    const StudentLoginID = req.body.StudentLoginID;
    const StudentLoginPassword = req.body.StudentLoginPassword;
    const StudentAddmissionDate = req.body.addmissionDate;
    const SchoolName = req.body.schoolName;
    const StudentAddress = req.body.studentAddress;
    const status = req.body.status;
    const type = req.body.type;
    const Class = req.body.sections;
    const Gender = req.body.gender;
if (!files || 
  !StudentName || 
  !StudentFatherName || 
  !StudentMotherName || 
  !StudentContactNumber || 
  !StudentClassId || 
  !StudentClassPassword || 
  !StudentAddmissionDate || 
  !status || 
  !type || 
  !Class || 
  !SchoolName || 
  !StudentAddress || 
  !Gender ||
  !StudentLoginID ||
  !StudentLoginPassword )
  {
      return res.status(400).json({ code: 400, message: 'Bad Request' });
    }
    console.log(StudentLoginID)
    console.log(StudentLoginPassword)
    console.log(StudentClassId)
    console.log(StudentClassPassword)
    // const studentPicPaths = files.path;
    // Assuming that the 'StudentPic' field in the form supports multiple files, loop through the array of files
    // for (const file of files) {
      const StudentPic = files.path;
      // Create a new document using the students_model model and save it to the database
      const new_student = new StudentsModel({ 
        StudentPic: StudentPic,
        StudentName: StudentName , 
        StudentFatherName: StudentFatherName, 
        StudentMotherName: StudentMotherName ,
        StudentContactNumber: StudentContactNumber ,
        StudentLoginID: StudentLoginID ,
        StudentLoginPassword: StudentLoginPassword ,
        StudentAddmissionDate: StudentAddmissionDate,
        SchoolName : SchoolName ,
        StudentAddress : StudentAddress,
        status:status , 
        type:type ,
        Gender : Gender,
          Class :{
            StudentID : null,
            StudentClassId : StudentClassId,
            StudentClassPassword : StudentClassPassword,
            ClassStd : Class,
            TotalFees : null,
            Subjects:[null],
            Teachers : [{
              TeacherId : null,
                teacherPic : null,
                teacherId : null,
                teacherName : null,
                qualification : null ,
                experience : null ,
                status : null,
                type : null
          }],
          }
        });
      try {
        console.log("new_student :-",new_student)
        const success = await new_student.save();
        console.log("success :- ",success)
        success.Class.StudentID = success._id;
        if (Class == "Class 1") {
          console.log("entering...")
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science", "Maths"];
          const teacherName = ["Abhay Yadav", "Pooja Yadav"];
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
          console.log("entering...!!!!!")
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            }); 
        }else if (Class == "Class 2") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science", "Maths"];
          const teacherName = ["Abhay Yadav", "Pooja Yadav"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 3") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science", "Maths"];
          const teacherName = ["Abhay Yadav", "Pooja Yadav"];
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }else if (Class == "Class 4") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science", "Maths"];
          const teacherName = ["Abhay Yadav", "Pooja Yadav"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }else if (Class == "Class 5") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science", "Maths"];
          const teacherName = ["Abhay Yadav", "Pooja Yadav"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }else if (Class == "Class 6") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science" , "Maths" , "Hindi" , "Marathi" , "Geography" , "Histoty/Civics"]
          const teacherName = ["Abhay Yadav" , "Pooja Yadav"]
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 7") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science" , "Maths" , "Hindi" , "Marathi" , "Geography" , "Histoty/Civics"]
          const teacherName = ["Abhay Yadav" , "Pooja Yadav" , "Keshav jha"]
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 8") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science" , "Maths" , "Hindi" , "Marathi" , "Geography" , "Histoty/Civics"]
          const teacherName = ["Abhay Yadav" , "Pooja Yadav" , "Keshav jha"]
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 9") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects =  ["Science" , "Maths" , "Hindi" , "Marathi" , "Geography" , "Histoty/Civics"]
          const teacherName =  ["Abhay Yadav" , "Pooja Yadav" , "Shubham Singh"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 10") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects =  ["Science" , "Maths" , "Hindi" , "Marathi" , "Geography" , "Histoty/Civics"]
          const teacherName =  ["Abhay Yadav" , "Pooja Yadav" , "Shubham Singh"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 11") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science" , "Maths" , "Chemistory" , "Biology" ]
          const teacherName =  ["Abhay Yadav" , "Keshav jha" , "Shubham Singh"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        else if (Class == "Class 12") {
          success.Class.TotalFees = 19000;
          success.Class.Subjects = ["Science" , "Maths" , "Chemistory" , "Biology" ]
          const teacherName =  ["Abhay Yadav" , "Keshav jha" , "Shubham Singh"];
        
          findTeachersWithSubjects(teacherName)
            .then((teachers) => {
              if (teachers === "No teachers found for the specified subjects.") {
                console.log("No teachers Available");
              } else {
                console.log("Teachers who can teach the specified subjects:", teachers);
        
                // Map teacher details into the student's Teachers array
                if (teachers.length > 0) {
                  success.Class.Teachers = teachers.map((teacher) => ({
                    teacherPic: teacher.teacherPic,
                    teacherId: teacher._id,
                    teacherName: teacher.teacherName,
                    qualification: teacher.qualification,
                    experience: teacher.experience,
                    status: teacher.status,
                    type: teacher.type,
                  }));
        
                  // Saving the results in the document
                  return success.save();
                }
              }
            })
            .then((savedSuccess) => {
              if (savedSuccess) {
                console.log('Student with updated Teachers array saved:', savedSuccess);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        
        if (!success) {
          return res.status(500).json({ code: 500, message: 'Server error' });
        }
      } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error' });
      }
    // }
    // Send a success response along with the student paths in the data array
    return res.status(200).json({ code: 200, message: 'Added_successfully', data: StudentPic });
  };



