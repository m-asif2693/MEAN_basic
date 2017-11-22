const express =require('express');
const routes = express.Router();
const passport =require('passport');
const jwt=require('jsonwebtoken')
const Users=require('../config/database')

const User=require('../models/userSchema')

// Rigister
routes.post('/register',(req,res,next)=>{
    // res.send("REGISTER")
    let newUser = User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })
    User.addUser(newUser, (err,callback)=>{
        if(err){
            res.json({success:false,msg:'Failed to register'})
        }else{
            res.json({success:true,msg:'Successfully Registered'})
        }
    })

})
routes.post('/authenticate', (req, res, next) => {
    // res.send('asfafafaf')
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        // if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            console.log(isMatch)
            if(!isMatch){
                console.log('sdgfasg')

                const token = jwt.sign({data: user}, Users.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                          email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});
// // authenticate
// routes.post('/auth',(req,res,next)=>{
//     // res.send("authenticate is working")
//     const username= req.body.username;
//     const password =req.body.password;
//
//     User.getUserByUsername(username, (err,user)=> {
//         if(user)throw err;
//         if(!user){
//             return res.json({
//                 success:false,
//                 msg:'User no Found'
//             })
//
//         }
//         User.comparePassword(password,user.password,(err,isMatch)=>{
//             if(err)throw err;
//             if(isMatch){
//                 const token = jwt.sign(user,config.secret,{
//                     expriresIn:604800
//                 });
//
//                 res.json({
//                     success:true,
//                     token:'JWT'+token,
//                     user:{
//                         id:user._id,
//                         name:user.name,
//                         username:user.username,
//                         email:user.email
//                     }
//                 });
//             }else{
//                 return res.json({
//                     succes:false,
//                     msg: "Wrong Password"
//                 })
//             }
//
//
//         })
//
//     })
// })


// Profile
routes.get('/profile',(req,res,next)=>{
    res.send("Profile is working" )


})

// validate
routes.get('/validate',(req,res,next)=>{
    res.send("validate is working")
})










module.exports = routes;