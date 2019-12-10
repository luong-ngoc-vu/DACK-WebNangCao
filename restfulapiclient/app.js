const express = require('express');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const url = require('./db').mongoURI;

const userRoute = require('./api/routes/user');
const introduce = require('./api/routes/introduce');

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));
mongoose.set('useCreateIndex', true);

require('./api/middlewares/passport');

const app = express();
app.use(cors());
app.disable('etag');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use('/user', userRoute);
app.use('/introduce', passport.authenticate('jwt', {session: false}), introduce);

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
