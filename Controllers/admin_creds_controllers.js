const adminModel = require('../Models/admin_login_model');
var jwt = require('jsonwebtoken');

// module.exports.adminCredentials = ()=>{
//   const AdminId = 'abhay@SA';
//   const  AdminPassword = 'abhay@941';
//   const  status = 'ACTIVE';
// const date = new Date().toISOString();

// const new_Admin = new admin_login_models({
//     AdminId: AdminId , 
//     AdminPassword: AdminPassword,
//     status:status,
//     date:date,
// })

// const success = await new_Admin.save()
// if(success){
//     return console.log("success")
// }else{
//     return console.log("unsuccess")  
// }
// }


module.exports.getAdmins = async (req ,res)=>{
const _data = await adminModel.find({})
if(_data){
    return res.send({code: 200 , message:'success', data:_data})
}else{
    return res.send({code : 500 , message: 'Server error'})  
}
} 

module.exports.addAdmins = async (req ,res)=>{
const _data = await adminModel.find({})
if(_data){
    console.log(_data)
    return res.send({code: 200 , message:'success', data:_data})
}else{
    return res.send({code : 500 , message: 'Server error'})  
}
}

module.exports.loginAdmins = async (req, res) => {
    const { AdminId, AdminPassword } = req.body;

    try {
        let user = await adminModel.findOne({ AdminId: AdminId  });

        if (user) {
            const isPasswordValid = user.AdminPassword === AdminPassword;
            if (isPasswordValid) {
                // Convert the user object to a plain JavaScript object
                let userObject = user.toObject();

                // Create the JWT token using the plain JavaScript object as the payload
                let _token = jwt.sign(userObject, 'PRV__abhay__');

                // If both AdminId and AdminPassword are correct, send success response
                return res.send({ code: 200, message: 'Success', token: _token });
            } else {
                // If the provided AdminPassword is incorrect
                return res.send({ code: 500, message: 'InvalidAdminPassword' });
            }
        } else {
            // If no user is found with the provided AdminId
            return res.send({ code: 500, message: 'InvalidAdminId' });
        }
    } catch (error) {
        // Handle any server/database errors
        console.error(error);
        return res.send({ code: 500, message: 'Server error' });
    }
};