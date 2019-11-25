const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res, next) => {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    })
            })
        });
    },

    updateUser: (req, res, next) => {
        User.findOne({"username": req.body.username}, (err, user) => {
            user.name = req.body.name;
            user.phone = req.body.phone;
            user.email = req.body.email;
            user.save();
            return res.status(200).json(user);
        })
    },

    changePassword: (req, res, next) => {
        User.findOne({"username": req.body.username}, (err, user) => {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400)
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => {
                            res.status(200).json(user);
                        })
                        .catch(err => {
                            res.status(400).json(err);
                        })
                })
            });
            return res.status(200).json(user);
        }).catch(err => {
            next(err)
        })
    },

    getUser: (req, res, next) => {
        res.status(200).json({
            message: 'Thông tin user hiện tại',
            user: req.user,
        });
    },
};
