const User = require('../models/user');
const Skill = require('../models/skill');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    register: (req, res, next) => {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            typeUser: req.body.typeUser,
        });
        User.findOne({ "email": req.body.email }, (err, user) => {
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

    updateUser: async (req, res) => {
        await User.findOne({ "email": req.body.email }, async (err, user) => {
            Object.assign(user, req.body);
            await user.save();
            res.status(200).json(user);
        })
    },

    changePassword: async (req, res) => {
        await User.findOne({ "email": req.body.email }, (err, user) => {
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

    getTeacher: async (req, res) => {
        const tutorrials = await User.find({ "typeUser": 2 });
        return res.status(200).json(tutorrials);
    },

    getTeacherCity: async (req, res) => {
        const city = req.params.provinceName;
        const tutorrialsCity = await User.find({ "provinceName": city, "typeUser": 2 });
        return res.status(200).json(tutorrialsCity);
    },

    getDetailTeacher: async (req, res) => {
        const id = req.params.id;
        await User.find({ "_id": ObjectId(id) }, function (err, teacher) {
            return res.status(200).json(teacher);
        });
    },

    getSkills: async (req, res) => {
        const skills = await Skill.find();
        return res.status(200).json(skills);
    },

    getTeachersBySkill: async (req, res) => {
        const nameSkill = req.params.name;
        const tutorrials = await User.find({ "skills": { $in: [nameSkill] }, "typeUser": 2 });
        return res.status(200).json(tutorrials);
    },

    lockAccount: async (req, res) => {
        await User.findOne({ "email": req.body.email }, async (err, user) => {
            user.isLocked = !user.isLocked;
            await user.save();
            res.status(200).json(user);
        })
    },

    getUserByEmail: async (req, res) => {
        await User.findOne({ "email": req.params.email }, async (err, user) => {
            res.status(200).json(user);
        })
    },

    getUserById: async (req, res) => {
        await User.findOne({ "_id": req.params.id }, async (err, user) => {
            res.status(200).json(user);
        })
    },

    getChildrentByNameSkill: async (req, res) => {
        const name = req.params.name;
        const skill = await Skill.findOne({ "name": name });
        return res.status(200).json(skill.children);
    },

    getTeacherBySkillNameAndSubSkill: async (req, res) => {
        const subSkillName = req.params.subSkillName;

        const listUserBySkill = await User.find({ "skills": { $in: [subSkillName] }, "typeUser": 2 });
        return res.status(200).json(listUserBySkill)
    }
};
