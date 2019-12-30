const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
require('./api/utils/db');

const rootAdminRoute = require('./api/routes/rootAdmin');
const adminRoute = require('./api/routes/admin');
const contractRoute = require('./api/routes/contract');
const messageRoute = require('./api/routes/message');

require('./api/middlewares/passport');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use('/rootAdmin', rootAdminRoute);
app.use('/admin', adminRoute);
app.use('/contract', contractRoute);
app.use('/message', messageRoute);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json(
        req.user
    );
});

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
