const notice_images_models = require('../Models/notice_images_model')
const fs = require('fs');

module.exports.addNoticeImg = async(req, res) => {
    console.log(req.files, req.body, 16); // Make sure req.files and req.body are defined and contain the expected data
    const title = req.body.title;
    const files = req.files;
  
    if (!files || !title) {
      return res.status(400).json({ code: 400, message: 'Bad Request' });
    }
  
    const noticePaths = files.map((file) => file.path);
  
    // Assuming that the 'notice' field in the form supports multiple files, loop through the array of files
    for (const file of files) {
      const notice = file.path;
  
      // Create a new document using the notice_images_models model and save it to the database
      const new_Notice_img = new notice_images_models({ notice: notice, title: title });
  
      try {
        const success = await new_Notice_img.save();
        if (!success) {
          return res.status(500).json({ code: 500, message: 'Server error' });
        }
      } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error' });
      }
    }
  
    // Send a success response along with the notice paths in the data array
    return res.status(200).json({ code: 200, message: 'Added_successfully', data: noticePaths });
  };
  
  module.exports.deleteNotice = async (req, res) => {
    const noticeId = req.params.id;
  
    try {
      // Find the notice by id and remove it
      const deletedNotice = await notice_images_models.findByIdAndRemove(noticeId);
  
      if (deletedNotice) {
        
        fs.unlinkSync(deletedNotice.notice); 
        return res.status(200).json({ code: 200, message: 'Notice_deleted_successfully' });
      } else {
        return res.status(404).json({ code: 404, message: 'Notice_not_found' });
      }
    } catch (error) {
      return res.status(500).json({ code: 500, message: 'Server error' });
    }
  };

// module.exports.getNoticeImg = async (req ,res)=>{

// const _data = await notice_images_models.find({});
// if(_data){
//     return res.send({code: 200 , message:'Added_successfully', data:_data})
// }else{
//     return res.send({code : 500 , message: 'Server error'})  
// }


// }

module.exports.getNoticeImg = async (req, res) => {
  try {
      const _data = await notice_images_models.find({});

      if (!_data || _data.length === 0) {
          return res.status(404).send({ code: 404, message: "No images found" });
      }

      // Assuming your MongoDB stores only the file names, construct the full URL
      const baseUrl = req.protocol + "://" + req.get("host"); // Dynamically get domain
      const imageData = _data.map((img) => ({
          ...img._doc, // Spread existing document fields
          imageUrl: `${baseUrl}/upload/${img.filename}`, // Construct full URL
      }));

      return res.status(200).send({ code: 200, message: "Success", data: imageData });
  } catch (error) {
      return res.status(500).send({ code: 500, message: "Server error", error });
  }
};