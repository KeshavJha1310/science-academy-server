const teacherModel = require('../Models/teachers_model')
const fs = require('fs');


module.exports.addTeacher = async (req, res) => {
    console.log("this is files :- ",req.files, "this is the body :- ", req.body, 16); // Make sure req.files and req.body are defined and contain the expected data
    const files = req.files;
    const teacherName = req.body.teacherName;
    const qualification = req.body.qualification;
    const subject = req.body.subject;
    const experiance = req.body.experiance;
    const status = req.body.status;
    const type = req.body.type;
    const classes = req.body.classes
   
    if (!files || !teacherName || !qualification || !subject || !experiance || !status || !type ||!classes ) {
      return res.status(400).json({ code: 400, message: 'Bad Request' });
    }
  
    const teacherPicPaths = files.map((file) => file.path);


    // Assuming that the 'teacherPic' field in the form supports multiple files, loop through the array of files
    for (const file of files) {
      const teacherPic = file.path;

   
      // Create a new document using the teachers_model model and save it to the database
      const new_teacher = new teacherModel({ 
        teacherPic: teacherPic,
         teacherName: teacherName , 
         qualification:qualification, 
          subject:subject ,
          experiance:experiance , 
          status:status , 
          type:type,
          classes: classes
        });
  
      try {
        const success = await new_teacher.save();
        if (!success) {
          return res.status(500).json({ code: 500, message: 'Server error' });
        }
      } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error' });
      }
    }
  
    // Send a success response along with the notice paths in the data array
    return res.status(200).json({ code: 200, message: 'Added_successfully', data: teacherPicPaths });
  };
  
  module.exports.getTeacher = async (req ,res)=>{
    const _data = await teacherModel.find({});
if(_data){
    return res.send({code: 200 , message:'Added_successfully', data:_data})
}else{
    return res.send({code : 500 , message: 'Server error'})  
}
}
  
module.exports.deleteTeacher = async (req, res) => {
  const teacherId = req.params.id;
  try {
    // Find the notice by id and remove it
    const deletedTeacher = await teacherModel.findByIdAndRemove(teacherId);
    console.log('deletedTeacher',deletedTeacher)
    if (deletedTeacher) {
      
      fs.unlinkSync(deletedTeacher.teacherPic); 
      return res.status(200).json({ code: 200, message: 'Teacher_deleted_successfully',deleted_teacher: deletedTeacher.teacherName });
    } else {
      return res.status(404).json({ code: 404, message: 'Teacher_not_found' , deleted_teacher: deletedTeacher.teacherName});
    }
  } catch (error) {
    return res.status(500).json({ code: 500, message: 'Server error' , });
  } 
};

module.exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log("@@@",id)
    console.log(req.body)
    const { teacherName, qualification, experience, status, type, subjects, classes } = req.body;

    const teacherPic = req.file ? req.file.path : undefined;

    const updatedTeacherData = {
      teacherName,
      qualification,
      experiance: experience,
      status,
      type,
      subject: subjects, 
      classes,
      ...(teacherPic && { teacherPic }),
    };


    console.log(updatedTeacherData)

    const updatedTeacher = await teacherModel.findByIdAndUpdate(
      id,
      { $set: updatedTeacherData },
      { new: true } 
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      data: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the teacher" });
  }
};