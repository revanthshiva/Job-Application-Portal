const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000; // Use dynamic port or default to 5000

app.use(cors());
app.use(bodyParser.json());

// SQL DB CONNECTION 
const db = mysql.createConnection({
    host: 'localhost',
    database: 'jobApplication',
    user: 'root',
    password: ''
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('SQL DB CONNECTED SUCCESSFULLY');
});


//MOGO DB CONNECTION

mongoose.connect('mongodb://localhost:27017/jobApplication')

const mdb = mongoose.connection;

mdb.on('error', console.error.bind(console, 'mongoose connection error'));
mdb.once('open', () => {
    console.log('mongoose connected successfully');
})

const applicationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    qualification: String,
    resume: String,
    info: String,
});

const Application = mongoose.model('application', applicationSchema);


// SQL  POST FUNCTION 
app.post('/apply/sql', (req, res) => {
    const { name, email, phone, qualification, resume, info } = req.body;

    // Basic validation (you can add more complex validation as needed)
    if (!name || !email || !phone || !qualification) {
        return res.status(400).send('All fields are required.');
    }

    const sql = 'INSERT INTO application (name, email, phone, qualification,resume, info) VALUES (?, ?, ?, ?, ?,?)';

    db.query(sql, [name, email, phone, qualification, resume, info], (err) => {
        if (err) {
            console.error('Error submitting application:', err);
            return res.status(500).send('There was an error submitting your application.');
        }
        res.send('Application Submitted Successfully');
    });

   

});

// mongoose  POST FUNCTION 

app.post('/apply/mongoose', async (req, res) => {
    const { name, email, phone, qualification, resume, info } = req.body;

    // Basic validation (you can add more complex validation as needed)
    if (!name || !email || !phone || !qualification ||!resume) {
        return res.status(400).send('All fields are required.');
    }


    try {
        const newApplication = new Application({
            name,
            email,
            phone,
            qualification,
            resume,
            info,
        });
        await newApplication.save();
        res.send('Application Submitted Successfully');

    }
    catch (error) {
        console.error('Problem with mongoose DB ', error);
        res.status(500).send('There was an error submitting your application.');

    }

});


// SERVER START 
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
