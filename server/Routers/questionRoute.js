const Router = require('express').Router();
const {getAllQuestions, getQuestionWithId, getAllQuestionsWithCategory, fiveRandomQuestions, updateQuestions} = require('../controllers/questions');

Router.route('/').get(getAllQuestions).put(updateQuestions);
Router.route('/:id').get(getQuestionWithId);
Router.route('/category/:category').get(getAllQuestionsWithCategory);
Router.route('/match/:category').get(fiveRandomQuestions);

module.exports = Router;