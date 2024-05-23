const express = require("express")
const router = express.Router()

const Table = require("../models/table_model")
const Profile = require('../models/profile_model');

// parent api is /api/table

const public_user_profile = (user) => {
    return { first_name: user.first_name, last_name: user.last_name, username: user.username, bio: user.bio }
}

// Gets all public tables
router.get("/", async (req, res) => {
    const tables = await Table.find({ public: true }).sort({ updatedAt: -1 })

    res.status(200).json(tables)
})

// makes the user leave the table
const leave_table = async (user, table) => {
    // checks if the user is even at the table first
    // 

    if (!user.current_dining_table.equals(table._id)) {
        return
    }

    user.current_dining_table = null
    const new_table = await Table.findByIdAndUpdate(table._id, { $pull: { users: user._id } })

    await Table.findOneAndDelete({ users: { $size: 0 } })

    await user.save()
}

const join_table = async (user, table) => {
    // if the user has a current dining table leave it

    if (user.current_dining_table) {

        const user_table = await Table.findById(user.current_dining_table)

        if (user_table != null) {
            await leave_table(user, user_table)
        }
    }

    user.current_dining_table = table._id
    table.users.push(user._id)

    await user.save()
    await table.save()
}

// joins the current user to the table
router.post("/join", async (req, res) => {
    const user = req.user
    const table = await Table.findById(req.body.table_id)

    try {
        await join_table(user, table)
        res.status(200).send("ok")
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})
router.post("/leave", async (req, res) => {
    const user = req.user
    const table = await Table.findById(req.body.table_id)

    try {
        await leave_table(user, table)
        res.status(200).send("ok")
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }

})

const create_table = async (name, public) => {
    const new_table = await Table.create({ name: name, public: public })
    return new_table
}


// creates table and joins for user
router.post("/create", async (req, res) => {
    const user = await req.user
    console.log(user)

    try {
        const table = await create_table(req.body.table_name, req.body.table_public)
        await join_table(user, table)
        res.status(200).send("ok")
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }


})



const calc_compatable = (user1, user2)=>{
    
    const mag = function(){
        let tot = 0
        for(let i = 0; i < arguments.length; i++){
            tot += arguments[i] * arguments[i]
        }
        
        
        return Math.sqrt(tot)
    }
    
    const ip = user1.clean * user2.clean + user1.nice * user2.nice + user1.talk * user2.talk + user1.smart * user2.smart
    const ip2 = mag(user1.clean, user1.nice, user1.talk, user1.smart) * mag(user2.clean, user2.nice, user2.talk, user2.smart)
    
    return ip/ip2
    
}

router.post("/lucky", async (req, res) => {

    try {
        const user = req.user
        if (user == null) {
            throw new Error("User not logged in")
        }
        
        // all users currently at a table
        const all_users = await Profile.find({_id: {$ne: user._id}, current_dining_table: {$ne: null}})
        
        if(all_users.length == 0){
            const table = await create_table( user.username + "'s table", true)
            await join_table(user, table)
            res.status(200).send("ok")
            return 
        }
        
        const best_user = all_users.reduce((prev, curr) =>{
            return (calc_compatable(user, prev) > calc_compatable(user, curr)) ? prev : curr
        })
        
        const table = await Table.findById(best_user.current_dining_table)
        await join_table(user, table)

    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})

module.exports = router
