const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from root directory
app.use(express.static(path.join(__dirname, '..')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rms')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Reservation Schema
const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    people: { type: Number, required: true },
    message: { type: String }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// 🔹 Signup API
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
        }

        // Create a new user with the plain text password
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Signup successful!' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during signup.' });
    }
});

// 🔹 Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Compare the plain text password
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        res.json({ success: true, message: 'Login successful!' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login.' });
    }
});

// 🔹 Booking API
app.post('/api/booking', async (req, res) => {
    const { name, email, phone, date, time, people, message } = req.body;

    console.log('Received Booking Data:', { name, email, phone, date, time, people, message }); // Log received data

    try {
        // Validate required fields
        if (!name || !email || !phone || !date || !time || !people) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }

        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({ success: false, message: 'Invalid date format. Use YYYY-MM-DD.' });
        }

        // Validate time format (HH:MM)
        const timeRegex = /^\d{2}:\d{2}$/;
        if (!timeRegex.test(time)) {
            return res.status(400).json({ success: false, message: 'Invalid time format. Use HH:MM.' });
        }

        // Create a new reservation with separate date and time fields
        const newReservation = new Reservation({
            name,
            email,
            phone,
            date, // Save date separately
            time, // Save time separately
            people: parseInt(people, 10), // Ensure people is a number
            message
        });

        await newReservation.save();
        console.log('Reservation saved successfully:', newReservation); // Log saved reservation
        res.status(201).json({ success: true, message: 'Booking successful!' });
    } catch (error) {
        console.error('Booking error:', error); // Log the error
        res.status(500).json({ success: false, message: 'An error occurred during booking.' });
    }
});

// 🔹 Contact API
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const contact = new Contact({ name, email, subject, message });
        await contact.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});