const Question = require('../models/questions');
const crypto = require('crypto');

function getRandomInt(min, max) {
  const range = max - min;
  const randomBuffer = crypto.randomBytes(4); // 4 bytes provide a range of 2^32
  const randomValue = randomBuffer.readUInt32LE(0); // Convert the random bytes to an integer
  return Math.floor((randomValue / 0xffffffff) * range) + min;
}

const getAllQuestions = async (req, res) => {
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
}

const getQuestionWithId = async (req, res) => {
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
}

const getAllQuestionsWithCategory = async (req, res) => {
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
}

const fiveRandomQuestions = async (req, res) => {
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
}

const updateQuestions = async (req, res) => {
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
}

module.exports = {
    getAllQuestions,
    getQuestionWithId,
    getAllQuestionsWithCategory,
    fiveRandomQuestions,
    updateQuestions
}