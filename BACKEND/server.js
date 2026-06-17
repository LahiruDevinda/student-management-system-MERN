require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL_DB = process.env.MONGODB_URL;

mongoose.connect(URL_DB)
    .then(() => {
        console.log('MongoDB database connection established successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const studentRouter = require('./routes/student');
app.use('/students', studentRouter);