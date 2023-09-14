const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const Question = require('./models/questions');

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