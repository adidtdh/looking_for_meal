const Profile = require("../models/profile_model");
const mongoose = require("mongoose");

const join_user_dining_table = async (user_id, table_id) =>{
    await Profile.findOneAndUpdate({_id: user_id}, {dining_state: true, current_dining_table: table_id})
}


const leave_user_dining_table = async (user_id, table_id) =>{
    await Profile.findOneAndUpdate({_id: user_id}, {dining_state: false})
}

module.exports = {join_user_dining_table, leave_user_dining_table}