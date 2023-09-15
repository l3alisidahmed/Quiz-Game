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
    }
}, {timestamps:true});

const User = mongoose.model('auth', appSchema);
module.exports= User;
