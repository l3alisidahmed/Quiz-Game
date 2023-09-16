const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const Question = require('./models/questions');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user');

// // connect to mongodb
const dbURI = "mongodb+srv://SidAhmed:123@cluster0.claucrs.mongodb.net/Quiz_Game?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    app.listen(3000, () => {
        console.log("server is runing in 3000");
    });
});


// connect to mongodb Users
// const dbURL = 'mongodb+srv://khawla_at:happyme@auth.iuakvsg.mongodb.net/auth?retryWrites=true&w=majority';
// mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then((result)=> app.listen(3000))
// .catch((err)=> console.error(err));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));
app.use(morgan('dev'));

// authentication:
// add users
app.post('/inscription', async(req, res) =>{
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
  });
    

// get user with email and pass
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
      
      const { _id, user_name } = user;
      res.status(200).json({ _id, user_name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// question api

const crypto = require('crypto');

function getRandomInt(min, max) {
  const range = max - min;
  const randomBuffer = crypto.randomBytes(4); // 4 bytes provide a range of 2^32
  const randomValue = randomBuffer.readUInt32LE(0); // Convert the random bytes to an integer
  return Math.floor((randomValue / 0xffffffff) * range) + min;
}

app.use(cors());

// // get all questions
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

// get questions with id
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

// get questions with category
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

// get random questions
app.get('/match/:category', async (req, res) => {
    try {
        let arr = [];
        const category = req.params.category;
        const questions = await Question.find();
        if (category === "Random") {
            for (let index = 0; index < 5; index++) {
                const randomInt = getRandomInt(0, 350); // Generates a random integer between 1 (inclusive) and 11 (exclusive)
                const element = questions[randomInt];
                arr.push(element)
            }
        } else {
            let result = [];
            for (let index = 0; index < questions.length; index++) {
                const element = questions[index];
                if (element.category === category) {
                    result.push(element); 
                }
            }
            for (let index = 0; index < 5; index++) {
                const randomInt = getRandomInt(0, result.length); // Generates a random integer between 1 (inclusive) and 11 (exclusive)
                const element = result[randomInt];
                arr.push(element); 
            }
        }
        res.send({
            success: true,
            question: arr
        });
    } catch (error) {
        console.log(error.message);
    }
});

// update questions
app.put('/', async (req, res) => {
    let arr = [];
    const { cate, newCategory } = req.body;
    const questions = await Question.find();
    questions.forEach(element => {
        if (element.category === cate) {
            console.log(element);
            const id = element._id;
            
            Question.findByIdAndUpdate(id, {category: newCategory},{new: true})
            .then((updatedUser) => {
                if (!updatedUser) {
                console.log('User not found.');
                } else {
                console.log('Updated user:', updatedUser);
                }
            })
            .catch((err) => {
                console.error('Error updating user:', err);
            });
        }
    });
});