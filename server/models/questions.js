const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const question_Schema = new Schema({
    question: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    correct_answer: {
        type: String,
        required: true
    },

    incorrect_answers: {
        type: Array,
        required: true
    },

    point: {
        type: Number,
        default: 3
    }
});

const Question = mongoose.model('Question', question_Schema);
module.exports = Question;