const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = {
    authLogin: (req, res, next) => {
        passport.authenticate('local', {session: false}, (err, admin, info) => {
            if (err || !admin) {
                return res.status(400).json({
                    message: 'Something is not right here',
                    admin: admin
                });
            }
            req.login(admin, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign({
                    email: admin.email,
                }, 'website_gia_su');
                return res.status(200).json({token: token, admin});
            });
        })(req, res);
    }
};
