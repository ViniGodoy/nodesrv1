const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const database = require('./model/db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

(async () => {
    try {
        const result = await database.sync();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
})();

app.use('/api', indexRouter);
indexRouter.use('/users', usersRouter);

module.exports = app;
