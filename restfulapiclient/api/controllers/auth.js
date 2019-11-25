const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    authLogin: (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) {
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
                    username: user.username,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                }, 'website_gia_su');
                return res.status(200).json({token, user});
            });
        })(req, res);
    }
};
