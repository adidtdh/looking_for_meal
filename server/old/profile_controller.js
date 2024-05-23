const Profile = require("../models/profile_model");
const mongoose = require("mongoose");

// get all users

const get_all_users = async (req, res) => {
    const profiles = await Profile.find({}).sort({ createdAt: -1 });

    res.status(200).json(profiles);
}

// get a user

const get_user = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such profile" });
    }

    const profiles = await Profile.findById(id);

    if (!profiles) {
        return res.status(404).json({ error: "No such profile" });
    }

    res.status(200).json(profiles);
}

//post a user
const create_user = async (req, res) => {

    // trying to add user to db
    try {
        const new_profile = await Profile.create({...req.body});
        res.status(200).json(new_profile);

    } catch (err) {
        res.status(400).json({ error: err.message });

    }
}

//delete a user

const delete_user = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such profile" });
    }

    const profiles = await Profile.findOneAndDelete({_id: id});

    if (!profiles) {
        return res.status(404).json({ error: "No such profile" });
    }

    res.status(200).json(profiles);

}

//update a user
const update_user = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such profile" });
    }

    const profiles = await Profile.findOneAndUpdate({_id: id}, {...req.body});

    if (!profiles) {
        return res.status(404).json({ error: "No such profile" });
    }

    res.status(200).json(profiles);

}



module.exports = { get_all_users, get_user, create_user, delete_user, update_user};