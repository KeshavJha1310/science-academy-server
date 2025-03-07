const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true 
    },
    // section: {
    //     type: String,
    //     required: true 
    // },
    academicYear: {
        type: String,
        required: true 
    },
    subjects: [
        {
            subjectID: String,
            subjectName: String,
            teachersID: [],
            periodsPerWeek: {
                type: Number,
                default: 0 
            }
        }
    ],
    students: [
        {
            studentID: {
                type: String,
                ref: 'Student', 
                // required: true
            },
            studentName: {
                type: String,
                // required: true
            },
            enrollmentDate: {
                type: String, 
                // required: true
            }
        }
    ],
    classTeacherId: {
        type: String,
        ref: 'Teacher',
        // required: true
    },
    teachers: [
        {
            teacherID: {
                type: String,
                ref: 'Teacher' 
            },
            teacherName: {
                type: String
            }
        }
    ],
    capacity: {
        type: Number,
        // required: true,
        min: 1 
    },
    ClassFeesPerStudent:{type:Number,default:0},
    // created_at: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

const ClassModel = mongoose.model('Class', classSchema);
module.exports = ClassModel;