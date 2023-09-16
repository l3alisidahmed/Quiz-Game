const Router = require('express').Router();
const {signinUser, loginUser} = require('../controllers/auth');

Router.route('/inscription').post(signinUser);
Router.route('/connexion/:email/:pass').get(loginUser);

module.exports = Router;