const subject = require('../Models/subject_model');
const teacherModel = require('../Models/teachers_model')
const MarksSchema = require('../Models/marks_model');

module.exports.addMarks = async (req, res) => {
  try {
    const {
      category,    
      classId,     
      examId,      
      obtainedMarks,
      remark,
      studentId,   
    } = req.body;

   
    if (
      !category ||
      !classId ||
      !examId ||
      !obtainedMarks ||
      !remark ||
      !studentId
    ) {
      return res.status(400).json({ error: "Fields are missing!" });
    }

    let marksDocument = await MarksSchema.findOne({
      studentId: studentId,
      classId: classId,
    });

    if (!marksDocument) {
      marksDocument = new MarksSchema({
        studentId,
        classId: classId,
        Weekly: [],
        Unit: [],
        Semester: [],
        "End Semester": [],
      });
    }

    if (!marksDocument[category]) {
      return res.status(400).json({ error: `Invalid category: ${category}` });
    }

    const newMarksEntry = {
      examId,
      obtainedMarks,
      remark,
    };

    marksDocument[category].push(newMarksEntry);

    await marksDocument.save();

    res.status(201).json({
      message: "Marks added successfully!",
      data: marksDocument,
    });
  } catch (error) {
    console.error("Error adding marks:", error);
    res.status(500).json({ error: "An error occurred while adding the marks" });
  }
};
