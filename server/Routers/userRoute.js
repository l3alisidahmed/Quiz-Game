const Router = require('express').Router();
const {signinUser, loginUser, getUserById} = require('../controllers/auth');

Router.route('/inscription').post(signinUser);
Router.route('/api/v1/users/:id').get(getUserById);
Router.route('/connexion/:email/:pass').get(loginUser);

module.exports = Router;