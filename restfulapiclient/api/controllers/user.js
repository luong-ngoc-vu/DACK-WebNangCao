const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res, next) => {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            typeUser: req.body.typeUser,
            image: "",
            address: "",
            moreInfo: ""
        });

        User.findOne({"email": req.body.email}, (err, user) => {
            if (user) {
                return res.status(400).json({
                    message: 'Tài khoản đã tồn tại !',
                });
            } else {
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
            }
        });
    },

    updateUser: (req, res) => {
        User.findOne({"email": req.body.email}, (err, user) => {
            // user.name = req.body.name;
            // user.phone = req.body.phone;
            // user.image = req.body.image;
            // user.address = req.body.address;
            // user.moreInfo = req.body.moreInfo;
            Object.assign(user, req.body);  //Khi nào cần cập nhật thông tin gì thì request thông tin đó lên thôi
            user.save();
            return res.status(200).json(user);
        })
    },

    changePassword: async (req, res) => {
        await User.findOne({"email": req.body.email}, (err, user) => {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).json({
                    message: 'Mật khẩu không chính xác !',
                });
            } else {
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
            }
        });
    },

    getUser: (req, res, next) => {
        res.status(200).json({
            message: 'Thông tin user hiện tại',
            user: req.user,
        });
    },
};
