const express = require('express')

const Profile = require('../models/profile_model');
const Table = require("../models/table_model")

const router = express.Router();

//parent /user
//
//

const public_user_profile = (user) => {
    return { first_name: user.first_name, last_name: user.last_name, username: user.username, bio: user.bio }
}

// get a user's public profile
router.get("/:id", async (req, res) => {
    try {
        const user = await Profile.findOne({ username: req.params.id })

        if (!user) {
            return res.status(404).send("Not found")
        }
        const public_profile = public_user_profile(user)

        res.status(200).json(public_profile)

    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }

})


// get a user's public profile
router.get("/id/:id", async (req, res) => {
    try {
        const user = await Profile.findById(req.params.id)

        if (!user) {
            return res.status(404).send("Not found")
        }
        const public_profile = public_user_profile(user)

        res.status(200).json(public_profile)

    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }

})

// get a user's friends
router.get("/:id/friends", async (req, res) => {
    try {
        const user = await Profile.findOne({username: req.params.id})

        if (!user) {
            return res.status(404).send("Not found")
        }

        res.status(200).json(user.friend_ids)

    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }

})


// checks a users friendship with another user
router.get("/:id/friendcheck", async (req, res) =>{
    let status = false
    try{
        const user = req.user
        
        if(user == null){
            res.status(401).send("Not signed in")
        }
        
        console.log(user)

        const friend = await Profile.findOne({ username: req.params.id, friend_ids: user._id })
        
        if(friend){
            status = true
        }
        
        res.status(200).json({friends: status})
        
    } catch(err){
        console.error(err)
        res.status(400).json({ error: err })
    }
})



// add a friend
router.post("/:id/friend", async (req, res) =>{
    try{
        const user = req.user
        const friend = await Profile.findOne({ username: req.params.id })
        
        
        if (!friend) {
            return res.status(404).send("Not found")

        }
        
        if(await Profile.findOne({ username: req.params.id, friend_ids: user._id })){
            return res.status(201).send("Already friends")
        }
        
        friend.friend_ids.push(user._id)
        user.friend_ids.push(friend._id)
        
        await user.save()
        await friend.save()
        
        res.status(200).send("ok")


    }catch(err){
        console.error(err)
        res.status(400).json({ error: err })
    }
})

// remove a friend
router.post("/:id/friend/remove", async (req, res) =>{
    try{
        const user = req.user
        const friend = await Profile.findOne({ username: req.params.id, friend_ids: user._id})
        
        
        if (!friend) {
            return res.status(404).send("Not found")

        }
        
        friend.friend_ids.remove(user._id)
        user.friend_ids.remove(friend._id)
        
        await user.save()
        await friend.save()
        
        res.status(200).send("ok")


    }catch(err){
        console.error(err)
        res.status(400).json({ error: err })
    }
})


router.get("/:id/table", async (req, res) => {
    try {

        const user = await Profile.findOne({ username: req.params.id })

        if (!user) {
            return res.status(404).send("Not found")
        }

        if (user.current_dining_table == null) {
            return res.status(201).send("No table")
        }

        const table = await Table.findById(user.current_dining_table);

        if (table == null) {
            return res.status(201).send("Table no longer exists")
        }
        
        res.status(200).json(table)

    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err })
    }

})





module.exports = router