const StudentsModel = require('../Models/students_model');

module.exports.getStudentList = async (req, res) => {
  try {
    const data = await StudentsModel.find({});
    if (data) {
      return res.send({ code: 200, message: 'Sended_successfully', data: data });
    } else {
      return res.status(500).send({ code: 500, message: 'Server error' });
    }
  } catch (error) {
    console.error('Error fetching student data:', error);
    return res.status(500).send({ code: 500, message: 'Server error' });
  }
};
