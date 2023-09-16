const bcrypt = require('bcrypt');
const User = require('../models/user');

const signinUser = async(req, res) =>{
    const { user_name, email, password } = req.body;
    const saltRounds = 10;
    try {
          // Generate a salt and hash the user's password
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const user = new User({
            user_name: user_name,
            email: email,
            password: hashedPassword,
          });
      
          user.save()
          .then(result => {
            res.status(201).json({ sucess: true, result, message: 'User registered successfully' });
          })
          .catch(err => console.log(err.message))
      
        } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: 'Internal server error' });
        }
}

const loginUser = async (req, res) => {
    const email = req.params.email;
    const password = req.params.pass;


    try {
        const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
    const corctpass = await bcrypt.compare(password, user.password);

      if (!corctpass) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      
      const { _id, user_name } = user;
      res.status(200).json({ _id, user_name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

module.exports = {
    signinUser,
    loginUser
}