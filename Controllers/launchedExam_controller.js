const ExamSchema = require('../Models/exam_model');

module.exports.launchExam = async (req, res) => {
  const {
    classID,
    examName,
    examType,
    subjectId,
    date,
    maxMarks,
    createAt,
    modeOfConduct,
    duration
  } = req.body;

  if (!classID || !examName || !examType || !subjectId || !date || !maxMarks ||!duration) {
    return res.status(400).json({ code: 400, message: 'Bad Request: Missing required fields' });
  }

  try {
    const newExam = new ExamSchema({
      classId: classID,
      examName,
      examType,
      subjectId,
      date: new Date(date), 
      maxMarks,
      mode:modeOfConduct,  
      duration,
      createAt: createAt ? new Date(createAt) : new Date() 
    });

    await newExam.save();

    res.status(201).json({ code: 201, message: 'Exam launched successfully', data: newExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Internal Server Error', error: error.message });
  }
};

module.exports.getLaunchedExam = async (req, res) =>{
try{

    const examsDetails = await ExamSchema.find({});
    if(!examsDetails || examsDetails.length === 0){
        return res.status(404).json({message:"No exams launched!"});
    }else{
        return res.status(200).json({message:"Exams details retrieved successfully",data:examsDetails});
    }

}catch(error){
    console.error("Error retrieving subject details:", error);
    return res.status(500).json({ message: "Error retrieving subject details", error });
}
}
