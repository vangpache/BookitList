
const express = require('express');
require('dotenv').config();
process.env.API_KEY

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const goodReadsRouter = require('./routes/goodReads.router');
const databaseRouter = require('./routes/database.router');
const usernamesRouter = require('./routes/usernames.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/books', goodReadsRouter);
app.use('/database', databaseRouter);
app.use('/database/discussion', databaseRouter);
app.use('/database/deletemyclub', databaseRouter);
app.use('/usernames', usernamesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
