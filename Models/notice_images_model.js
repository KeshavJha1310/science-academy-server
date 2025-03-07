const mongoose  = require('mongoose');

module.exports = mongoose.model('notices' , {
    title : String,
    notice : String,
}); 