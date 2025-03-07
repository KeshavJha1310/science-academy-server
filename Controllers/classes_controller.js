const teacherModel = require('../Models/teachers_model')
const subjectModel = require('../Models/subject_model');
const StudentsModel = require('../Models/students_model')
const ClassModel = require('../Models/class_model')


function getAcademicYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); 

    if (currentMonth < 3) {
        return `${currentYear - 1}-${currentYear}`;
    } else {
        return `${currentYear}-${currentYear + 1}`;
    }
}

const subjects = async (classNum) => {
    try {
        const subjects = await subjectModel.find({ classes: classNum });
        if (subjects.length === 0) {
            return []; 
        }

        return subjects.map((subject) => ({
            subjectID: subject._id,
            subjectName: subject.subjectName,
            teachersID: subject.assignedTeachers || [], 
            periodsPerWeek: 5 
        }));
    } catch (error) {
        console.error(`Error fetching subjects for ${classNum}:`, error.message);
        return [];
    }
};

const getstudents = async (classNum) =>{
    try{
        const students = await StudentsModel.find();
        if(students.length === 0){ 
            console.log("no students!")
            return[];
        }else{ 
            const filteredStudents = students
            .filter(student => student.Class.ClassStd === classNum) 
            .map(student => ({
                studentID: student._id,
                studentName: student.StudentName, 
                enrollmentDate: student.StudentAddmissionDate,
            }));
        console.log(filteredStudents)
        return filteredStudents;
        }   
    }catch(error){
        console.error(`Error fetching students for ${classNum}:`, error.message);
        return [];
    }
}  

const getClassTeacher = async (classNum) => {
    try {
        const classTeachers = await teacherModel.find({ classes: classNum, type: 'ClassTeacher' });

        if (classTeachers.length === 0) {
            console.log(`No class teacher found for class ${classNum}`);
            return null;
        }

        return classTeachers[0]._id; 
    } catch (error) {
        console.error(`Error fetching class teacher for ${classNum}:`, error.message);
        return null;
    }
};
 

const getTeacher=async(classNum)=>{
    try{
        const teachers = await teacherModel.find({classes:classNum});
        if(teachers.length === 0){
            return [];
        }else{
            return teachers.map((teachers)=>({
                teacherID:teachers._id,
                teacherName: teachers.teacherName
            }))
        }
    }catch(error){
        console.error(`Error fetching subjects for ${classNum}:`, error.message);
        return [];
    }
}

module.exports.classStructure = async ()=>{
    for(let classNum = 1;classNum<=12;classNum++){
        let className = `Class ${classNum}`
        const classExists = await ClassModel.findOne({ className: className, academicYear: getAcademicYear() });

        if (classExists) {
            continue;
        }
        const classSubjects = await subjects(className);
        const students = await getstudents(className);
        const classTeacher = await getClassTeacher(className)
        const teachers = await getTeacher(className)
 
        const newClass = new ClassModel({
            className: className,
            academicYear: getAcademicYear(),
            subjects : classSubjects,
            students : students,
            classTeacherId:classTeacher,
            teachers: teachers,
            capacity: 10,
            ClassFeesPerStudent:19000,
        })  
        // console.log("newClass",newClass) 
        try{
            // console.log("newClass",newClass)
            const classCreated = await newClass.save();
            //// console.log(classCreated)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports.getclassData = async (req, res) =>{
    try{
        const classData = await ClassModel.find({});
        if(classData){
            return res.send({ code: 200, message: 'Sended_successfully', data: classData });
        }else{
            return res.status(500).send({ code: 500, message: 'Server error' });
        }
    }catch(error){
        console.error('Error fetching class data:', error);
        return res.status(500).send({ code: 500, message: 'Server error' });
    }

}