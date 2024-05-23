const Table = require("../models/table_model")
const mongoose = require("mongoose")

const { join_user_dining_table, leave_user_dining_table } = require("./table_profile_controller")

const { get_user_from_id, get_user_from_username, get_user_public_profile, get_user_name, get_dining_status } = require("./user_data_controller")

const create_table = async (name, public) => {
    const new_table = await Table.create({ name: name, public: public, size: 0 })
    return new_table

}

const delete_table = async (id) => {
    await Table.findOneAndDelete({ _id: id })
}

const add_user_to_table = async (table_id, user_id) => {
    await Table.findByIdAndUpdate(table_id, { $push: { users: user_id }, $inc: { size: 1 } })
}


const remove_user_from_table = async (table_id, user_id) => {
    console.log("1a")
    const user = await get_user_from_id(user_id)
    console.log("2a")
    console.log(user.dining_state, table_id, user.current_dining_table)
    
    const here = (user.dining_state && (table_id.equals(user.current_dining_table)))
    console.log(here)
    if (!here) {
    console.log("2ab")
        throw new Error("User not in table")
    }
    console.log("3a")

    const curr_table = await Table.findByIdAndUpdate(table_id, { $pull: { users: user_id }, $inc: { size: -1 } })
    console.log("4a")

    if (curr_table && curr_table.size == 0) {
        await delete_table(curr_table._id)
    }
    console.log("5a")
}


const self_create_and_join = async (req, res) => {
    try {
        const user = await get_user_from_id(req.user._id)
        if (user.dining_state) {
            remove_user_from_table(user.current_dining_table, user._id)
        }

        const new_table = await create_table(req.body.table_name, req.body.table_public)
        await add_user_to_table(new_table._id, req.user._id)

        res.status(200).send("ok");
    } catch (err) {
        res.status(400).json({ error: err });
    }

}

const self_join_table = async (req, res) => {
    try {
        const user = await get_user_from_id(req.user._id)
        if (user.dining_state) {
            remove_user_from_table(user.current_dining_table, user._id)
        }

        await add_user_to_table(req.body.table_id, req.user._id)
        await join_user_dining_table(req.user._id, req.body.table_id)
        res.status(200).send("ok")
    } catch (err) {

        res.status(400).json({ error: err })
    }
}

const self_leave_table = async (req, res) => {
    try {
        await remove_user_from_table(req.body.table_id, req.user._id)
        await leave_user_dining_table(req.user._id, req.body.table_id)
        res.status(200)
    } catch (err) {

        res.status(400).json({ error: err })
    }

}


// gets all public tables
const self_get_all_tables = async (req, res) => {
    const tables = await Table.find({ public: true }).sort({ createdAt: -1 });


    res.status(200).json(tables)
}



module.exports = { self_get_all_tables, self_create_and_join, self_join_table, self_leave_table }