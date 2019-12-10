const Admin = require('../models/admin1');
const bcrypt = require('bcryptjs');

module.exports = {
    createAdmin: (req, res, next) => {
        const newAdmin = new Admin({
            email: req.body.email,
            password: req.body.password,
            typeUser: 2
        });
        Admin.findOne({"email": req.body.email}, (err, admin) => {
            if (admin) {
                return res.status(400).json({
                    message: 'Tài khoản đã tồn tại !',
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin.save()
                            .then(admin => {
                                res.status(200).json(admin);
                            })
                            .catch(err => {
                                res.status(400).json(err);
                            })
                    })
                });
            }
        });
    },
};
