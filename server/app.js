const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const questionRouter = require('./Routers/questionRoute');
const userRoute = require('./Routers/userRoute');

// // connect to mongodb
const dbURI = "mongodb+srv://SidAhmed:123@cluster0.claucrs.mongodb.net/Quiz_Game?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {
    app.listen(3000, () => {
        console.log("server is runing in 3000");
    });
});

app.use(cors());
app.use(express.json());

app.use('', questionRouter, userRoute);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/questions', questionRouter);
app.use(express.urlencoded({ extended: false })); 
