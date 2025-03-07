const mongoose = require('mongoose')

const marksSchema = new mongoose.Schema({
    studentId: {
       type: String,
        required: true
    },
    classId: {
        type: String,
        required : true
    },
    "Weekly":[
        {
            examId:{
                type:String,
                required:true
            },
            obtainedMarks:{
                type:String,
                required:true
            },
            remark:{
                type:String,
                required:true
            }
        }
    ],
    "Unit":[
        {
            examId:{
                type:String,
                required:true
            },
            obtainedMarks:{
                type:String,
                required:true
            },
            remark:{
                type:String,
                required:true
            }
        }
    ],
    "Semester":[
        {
            examId:{
                type:String,
                required:true
            },
            obtainedMarks:{
                type:String,
                required:true
            },
            remark:{
                type:String,
                required:true
            }
        }
    ],
    "End Semester":[
        {
            examId:{
                type:String,
                required:true
            },
            obtainedMarks:{
                type:String,
                required:true
            },
            remark:{
                type:String,
                required:true
            }
        }
    ]

});

const MarksSchema = mongoose.model('MarksSchema',marksSchema);
module.exports = MarksSchema;

            // testId:{
            // type: String,
            // require: true
            // },
            // TestCategory : {
            //     type:String,
            //     required: true
            // },
            // modeOfTest:{
            //     type: String,
            //     require:true
            // },
            // testDate:{
            //     type:String,
            //     require:true
            // },
            // outOfMarks:{
            //     type: Number,
            //     required: true
            // },
            // obtainedMarks: {
            //     type: Number,
            //     required: true
            // },
            // aboutTest:{
            //     type: String
            // },
            // remark:{
            //     type:String
            // },
            // reportCardGenerated:{
            //     type: Boolean,
            //     default: false,
            //     required:true
                
            // },

            // {
            //     subjectId:{
            //         type:String,
            //         required:true
            //     },
            //     subjectName:{
            //         type:String,
            //         require:true
            //     },
            //     examTypes:[
            //         {
            //             examId:{
            //                 type:String,
            //                 required:true
            //             },
            //             category:{
            //                 type:String,
            //                 required:true
            //             },
            //             obtainedMarks:{
            //                 type:Number,
            //                 required:true
            //             },
            //             totalMarks:{
            //                 type:Number,
            //                 required:true
            //             },
            //             remark:{
            //                 type:String
            //             }
            //         }
            //     ]
    
            // }