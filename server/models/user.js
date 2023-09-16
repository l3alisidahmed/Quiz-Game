const mongoose = require('mongoose');
const schema = mongoose.Schema;

const appSchema = new schema({
    user_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    Rank: {
        type: Number,
        default: 0
    }

}, {timestamps:true});

const User = mongoose.model('User', appSchema);
module.exports= User;
