const mongoose = require('mongoose'); //require mongoose for mongodb databae

const Schema = mongoose.Schema

const table_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Types.ObjectId,
        required: false
    }],
    public: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('table', table_schema);