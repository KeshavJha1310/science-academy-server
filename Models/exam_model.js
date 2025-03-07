const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({

    classId : {
        type:String,
        required:true
    },

    examName: {
        type: String,
        required:true
    },
    examType: {
        type: String,
        required: true
    },
    subjectId:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        required: true
    },
    maxMarks:{
        type:Number,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    mode:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        required:true
    }
});
const ExamSchema = mongoose.model('ExamSchema',examSchema);
module.exports = ExamSchema;
