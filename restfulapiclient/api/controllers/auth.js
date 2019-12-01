const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    authLogin: (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right here',
                    user: user
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign({
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                }, 'website_gia_su');
                return res.status(200).json({token: token, user});
            });
        })(req, res);
    }
};
