const subjectModel = require('../Models/subject_model');
const teacherModel = require('../Models/teachers_model')
const fs = require('fs');


  
module.exports.addSubject = async(req, res) =>{
console.log(req.body);
try{

const { subjectName, aboutSubject, classes, subject_teacher } = req.body;

if (!subjectName) {
    return res.status(400).json({ error: "Subject Name is required" });
  }
    const newSubject = new subjectModel({
      subjectName,
      subjectDescription: aboutSubject,
      classes,
      assignedTeachers: subject_teacher,
    });

    await newSubject.save();
    res.status(201).json({
      message: "Subject added successfully",
      data: newSubject,
    });

}catch(error){
    console.error("Error adding subject:", error);
    res.status(500).json({ error: "An error occurred while adding the subject" });
}

}

module.exports.getSubjectDetails = async (req, res) => {
    try {
      const subjectInfo = await subjectModel.find({});
  
      if (!subjectInfo || subjectInfo.length === 0) {
        return res.status(404).json({ message: "No subjects found" });
      }
  
      const subjectDetails = await Promise.all(
        subjectInfo.map(async (subject) => {
          const teachers = await teacherModel.find({ _id: { $in: subject.assignedTeachers } });
          return {
            ...subject.toObject(),
            assignedTeachers: teachers,
          };
        })
      );
  
      return res.status(200).json({ message: "Subject details retrieved successfully", data: subjectDetails });
    } catch (error) {
      console.error("Error retrieving subject details:", error);
      return res.status(500).json({ message: "Error retrieving subject details", error });
    }
  };

module.exports.updateSubject = async (req, res) => {
    try {
      const subjectId = req.params.id;
      const updatedData = req.body;
      console.log("subjectId : ",subjectId,"updatedData :",updatedData )
      const updatedSubject = await subjectModel.findByIdAndUpdate(subjectId, updatedData, {
        new: true, 
        runValidators: true, 
      });
  
      if (!updatedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      res.status(200).json({
        message: "updated successfully",
        data: updatedSubject.subjectName,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while updating the subject" });
    }
  };

module.exports.deleteSubject = async(req, res) =>{
    const subjectID = req.params.id;
    try{
        const deleteSubject = await subjectModel.findByIdAndRemove(subjectID);
        console.log("deleted Subject :-",deleteSubject);
        if(deleteSubject){
            return res.status(200).json({code:200,message:'Subject deleted!'})
        }else {
            return res.status(404).json({code:404,message:'failed to deleted!'})
        }
    }catch(error){
        return res.status(500).json({ code: 500, message: 'Server error' , });

    }
}
