const mongoose =require('mongoose');
const bcryptjs =require('bcryptjs');
const config =require('../config/database')
const userSchema= mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const User =module.exports  = mongoose.model('User',userSchema);

module.exports.getUserByID= (id,callback)=>{
    User.findById(id,callback)
}

module.exports.getUserByUsername= userSchema.static.getUserByUsername  =(username,callback)=>{
    const query ={username:username}
    User.findOne(query, callback)


}

module.exports.addUser =(newUser,callback)=>{
    bcryptjs.genSalt(10,(err,hash)=>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback)
    })

}
module.exports.comparePassword=(candidatePassword,hash,callback)=>{

bcryptjs.compare(candidatePassword,hash,(err,isMatch)=>{
    console.log(isMatch)
    if(err) throw err;
    callback(null,isMatch)
})
}