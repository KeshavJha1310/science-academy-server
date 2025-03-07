const mongoose = require('mongoose');

module.exports = mongoose.model('Subjects',{
    subjectName: String,
    subjectDescription : String,
    classes : Array,
    assignedTeachers : Array
})  