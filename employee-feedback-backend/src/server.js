require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const feedbackRoutes = require('./routes/feedback');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/feedback',feedbackRoutes);
app.use('/auth',authRoutes);

connectDB()
    .then(() => {
        app.listen(process.env.PORT,() => {
            console.log(`✅ Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ DB Connection failed:",err.message);
        process.exit(1);
    });
