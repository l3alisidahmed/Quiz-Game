const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const Question = require('./models/questions');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const saltRounds = 10;

// connect to mongodb Users
const dbURL = 'mongodb+srv://khawla_at:happyme@auth.iuakvsg.mongodb.net/auth?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> app.listen(3000))
 .catch((err)=> console.error(err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/inscription', async(req, res) =>{
    const { user_name, email, password } = req.body;
    try {
        // Generate a salt and hash the user's password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({
          user_name,
          email,
          password: hashedPassword,
        });
    
        await user.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
app.get('/connexion/:email/:pass', async (req, res) => {
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
      
      const { user_name } = user;
      res.status(200).json({ user_name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// connect to mongodb
const dbURI = "mongodb+srv://SidAhmed:123@cluster0.claucrs.mongodb.net/Quiz_Game?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    app.listen(3000, () => {
        console.log("server is runing in 3000");
    });
});

const crypto = require('crypto');

function getRandomInt(min, max) {
  const range = max - min;
  const randomBuffer = crypto.randomBytes(4); // 4 bytes provide a range of 2^32
  const randomValue = randomBuffer.readUInt32LE(0); // Convert the random bytes to an integer
  return Math.floor((randomValue / 0xffffffff) * range) + min;
}

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const result = await Question.find();
        const size = result.length;
        res.send({
            success: true,
            size,
            result
        });   
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/api/v1/questions/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Question.findById(id);
        res.send({
            success: true,
            result
        });   
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/api/v1/questions/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const questions = await Question.find()
        const arr = [];
        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];
            if (element.category === category) {
                arr.push(questions[index])
            }
        }   
        res.send({
            success: true,
            arr,
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/match', async (req, res) => {
    try {
        const questions = await Question.find()
        const randomInt = getRandomInt(0, 350); // Generates a random integer between 1 (inclusive) and 11 (exclusive)
        const question = questions[randomInt];
        res.send({
            success: true,
            question
        });
    } catch (error) {
        console.log(error.message);
    }
});