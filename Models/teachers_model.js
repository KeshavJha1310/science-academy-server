const mongoose = require('mongoose');

module.exports = mongoose.model('teacherModel' , {
    teacherPic : String,
    teacherName : String,
    qualification : String,
    subject : Array,
    experiance : Number,
    status: String,
    type : String,
    classes : Array
}); 