const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userSchema');
const config = require('../config/database');

// module.exports=function (passport) {
//     let opts={}
//     opts._jwtFromRequest=extractStrategy.fromAuthHeaderWithScheme()
//     opt._secretOrKeyProvider=config.secret
//     passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
//         User.getUserByID(jwt_payload._id,(err,user)=>{
//             if(err){
//                 return done(err,false)
//             }
//             if(user){
//                 return done(null,false)
//             }else{
//                 return done(null,user   )
//             }
//         })
//     }))
// }


module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}