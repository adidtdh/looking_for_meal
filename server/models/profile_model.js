const mongoose = require('mongoose'); //require mongoose for mongodb databae

const Schema = mongoose.Schema

const profile_schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, //lol
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    current_dining_table: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    friend_ids: [{
        type: mongoose.Types.ObjectId,
        required: false
    }],
    clean: {
        type: Number,
        required: true
    },
    nice: {
        type: Number,
        required: true
    },
    talk: {
        type: Number,
        required: true
    },
    smart: {
        type: Number,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('profile', profile_schema);

/* 

curl -i -X POST -H 'Content-Type: application/json' -d '{
"username": "adi",
"password": "cat5e!",
"first_name": "Adi",
"last_name": "Rathni",
"bio": "Hi my name is adi",
"dining_state": false
}' http://localhost:4000/api/profile/
*/