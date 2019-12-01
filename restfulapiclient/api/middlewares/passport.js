const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return done(null, false, {message: 'User not found !'});
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch)
                return done(null, false, {message: 'Password is wrong'});
            return done(null, user, {message: 'Signed in successfully'});
        });
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'website_gia_su'
    },
    function (jwtPayload, cb) {
        return UserModel.findOne(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
