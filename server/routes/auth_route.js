const express = require('express')
const bcrypt = require("bcrypt")
const passport = require("passport")

const Profile = require('../models/profile_model');
const router = express.Router();

const init_passport = require("../passport_config")

init_passport(passport)


router.post("/login", (req, res) => {

    const user = passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login", failureFlash: true })(req, res, () => {
        console.log(this.arguments)
    })

})


router.post("/signup", async (req, res) => {
    try {

        const { username, password, first_name, last_name, bio, clean, nice, talk, smart } = req.body
        const hashed_password = await bcrypt.hash(password, 10);

        // trying to add user to db
        const new_profile = await Profile.create({ username, password: hashed_password, first_name, last_name, bio, clean, nice, talk, smart});
        
        res.redirect("/")

        res.status(200);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.get("/", (req, res) => {
    const authenticated = typeof req.user !== 'undefined'

    res.status(200).json({ authenticated : (authenticated? req.user._id : false)
    });
});

router.post("/logout", function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});


router.post("/update", async (req, res) => {
    try {
        
        const user = req.user

        if(!user){
            throw new Error("User is not loggedin")
        }

        const { username, password, first_name, last_name, bio, clean, nice, talk, smart } = req.body
        
        /*
        username == ""? username = user.username : null
        password == ""? password = user.password : null
        first_name == ""? first_name = user.first_name : null
        last_name == ""? last_name = user.last_name : null
        bio == ""? bio = user.bio : null
        */

        const hashed_password = await bcrypt.hash(password, 10);

        // trying to add user to db
        const new_profile = await Profile.findOneAndUpdate({_id: user._id}, { username, password: hashed_password, first_name, last_name, bio, clean, nice, talk, smart});
        
        res.redirect("/")

        res.status(200);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router