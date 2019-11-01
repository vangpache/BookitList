
const express = require('express');
require('dotenv').config();
process.env.API_KEY

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

//Cloudinary and file uploads
const fileupload = require('express-fileupload');
const cors = require('cors');

// Route includes
const userRouter = require('./routes/user.router');
const goodReadsRouter = require('./routes/goodReads.router');
const databaseRouter = require('./routes/database.router');
const usernamesRouter = require('./routes/usernames.router');
const notificatonsRouter = require('./routes/notifications.router');
const fileUpload = require('./routes/cloudinary.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

//cors middleware
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

/* Routes */
app.use('/api/user', userRouter);
app.use('/books', goodReadsRouter);
app.use('/database', databaseRouter);
app.use('/database/discussion', databaseRouter);
app.use('/database/deletemyclub', databaseRouter);
app.use('/notifications', notificatonsRouter);
app.use('/usernames', usernamesRouter);
app.use('/fileupload', fileUpload);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
