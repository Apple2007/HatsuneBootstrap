const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // Assuming your HTML file is in a 'public' directory

app.post('/aboutauthor.html', (req, res) => {
    const { name, email, message } = req.body;

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'jack@jackshorenstein.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Failed to send email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Message sent successfully:', info.response);
            res.send('Message sent successfully');
        }
    });
});

// Add a route handler for GET requests to the '/contact' route
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/aboutauthor.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});