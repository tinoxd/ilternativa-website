
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Check required environment variables
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI environment variable is not set!');
  console.error('Please set MONGODB_URI in your environment variables or .env file');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('WARNING: JWT_SECRET environment variable is not set!');
  console.error('Authentication features will not work properly');
}

app.use(cors());
app.use(express.json());

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Connection string:', uri ? uri.substring(0, 30) + '...' : 'undefined');
    process.exit(1);
  });

const connection = mongoose.connection;
connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

const authRouter = require('./routes/auth');
const eventsRouter = require('./routes/events');
const youtubeRouter = require('./routes/youtube');
const registrationsRouter = require('./routes/registrations');
const applicationsRouter = require('./routes/applications');
const statisticsRouter = require('./routes/statistics');
const activityTracker = require('./middleware/activityTracker');

// Отслеживание активности для основных маршрутов
app.use('/auth/login', activityTracker('login'));
app.use('/auth/register', activityTracker('registration'));

app.use('/auth', authRouter);
app.use('/events', eventsRouter);
app.use('/youtube', youtubeRouter);
app.use('/registrations', registrationsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/statistics', statisticsRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
