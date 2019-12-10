const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./_helpers/error-handler');
require('./api/utils/db');

const authRouter = require('./api/routes/authRoute');
const clientRouter = require('./api/routes/clientManament');
const skillRouter = require('./api/routes/skillRoute');
const rootAdminRoute = require('./api/routes/rootAdmin');

const app = express();
app.use(cors());

app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use('/auth', authRouter);
app.use('/client', clientRouter);
app.use('/skill', skillRouter);
app.use('/rootAdmin', rootAdminRoute);

app.use(errorHandler);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
