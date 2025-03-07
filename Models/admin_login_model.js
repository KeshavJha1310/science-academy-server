// const mongoose = require('mongoose');

// const adminModel = mongoose.model('adminModel', {
//  // Type:String,
//   AdminId: String,
//   AdminPassword: String,
//   //status: String,
//   date: String, // Updated property name to "date"
// });


// module.exports = adminModel;

// adminModel.create({
//   //Type:'ADMIN',
//   AdminId: 'abhay@SA',
//   AdminPassword: 'abhay@941',
//   //status: 'ACTIVE',
//   date: new Date().toISOString()
// })

const mongoose = require('mongoose');

const adminModel = mongoose.model('adminModel', {
  AdminId: String,
  AdminPassword: String,
  date: String,
});

module.exports = adminModel;

// Check if the document already exists before creating a new one
const checkAndCreateAdmin = async () => {
  try {
    const existingAdmin = await adminModel.findOne({ AdminId: 'abhay@SA', AdminPassword: 'abhay@941' });

    if (!existingAdmin) {
      const newAdmin = await adminModel.create({
        AdminId: 'abhay@SA',
        AdminPassword: 'abhay@941',
        date: new Date().toISOString(),
      });

      console.log('New document created:', newAdmin);
    } else {
      console.log('Document already exists:', existingAdmin);
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

checkAndCreateAdmin();

