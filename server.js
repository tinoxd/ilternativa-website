
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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
