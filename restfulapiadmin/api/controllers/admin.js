const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/normalUser');
const ObjectId = require('mongodb').ObjectID;

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
    },

    getUsers: async (req, res) => {
        const users = await User.find();
        return res.status(200).json(users);
    },

    getUser: async (req, res) => {
        const id = req.body._id;
        const users = await User.find({"_id": ObjectId(id)});
        return res.status(200).json(users);
    },
};
