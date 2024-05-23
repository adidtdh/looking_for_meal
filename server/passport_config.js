const local_strategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const mongoose = require("mongoose")
const Profile = require("./models/profile_model")

const init_passport = (passport)=>{
    passport.use(new local_strategy(async (username, password, done)=>{
        const user = await Profile.findOne({username: username})
        
        
        if(user == null){
            return done(null, false, {error: "no user found"})
        }
        
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)

            } else{
                return done(null, false, {error: "password incorrect"})
            }
            
        } catch (err) {
            return done(err)
        }


    }))
    
    passport.serializeUser((user, done) =>{
        done(null,user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        return done(null, await Profile.findById(id))
    })
}

module.exports = init_passport