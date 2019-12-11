const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AdminModel = require('../models/admin1');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const admin = await AdminModel.findOne({email});
        if (!admin) {
            return done(null, false, {message: 'Admin not found !'});
        }
        bcrypt.compare(password, admin.password).then(isMatch => {
            if (!isMatch)
                return done(null, false, {message: 'Password is wrong'});
            return done(null, admin, {message: 'Signed in successfully'});
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
        return AdminModel.findOne(jwtPayload._id)
            .then(admin => {
                return cb(null, admin);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
