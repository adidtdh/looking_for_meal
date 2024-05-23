const Profile = require("../models/profile_model");
const mongoose = require("mongoose");

const get_user_from_id = async (id)=>{
    return await Profile.findById(id)
}

const get_user_from_username = async (username)=>{
    return await Profile.findOne({username:username})
}

const get_user_public_profile = async (id)=>{
    const user = await get_user_from_id(id)
    
    return {username: user.username, name: (user.first_name + " " + user.last_name), bio: user.bio, dining_state: user.dining_state, current_dining_table: user.current_dining_table}
}

const get_user_name = async (id)=>{
    const user = await get_user_from_id(id)
    return (user.first_name + " " + user.last_name)
}

const get_dining_status = async (id)=>{
    const user = await get_user_from_id(id)
    return user.dining_state
}

module.exports = {get_user_from_id, get_user_from_username, get_user_public_profile, get_user_name, get_dining_status}
