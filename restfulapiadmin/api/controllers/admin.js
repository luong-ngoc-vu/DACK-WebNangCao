const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/normalUser');
const Skill = require('../models/skill');
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

    createSkill: async (req, res) => {
        const newSkill = new Skill({
            name: req.body.name,
        });
        Skill.findOne({"name": req.body.name}, (err, skill) => {
            if (skill) {
                return res.status(400).json({
                    message: 'Tên skill đã tồn tại !',
                });
            } else {
                newSkill.save()
                    .then(skill => {
                        res.status(200).json(skill);
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    })
            }
        });
    },

    getSkills: async (req, res) => {
        const skills = await Skill.find();
        return res.status(200).json(skills);
    },

    getSkill: async (req, res) => {
        const id = req.body._id;
        const skill = await Skill.find({"_id": ObjectId(id)});
        return res.status(200).json(skill);
    },

    updateSkill: async (req, res) => {
        const id = req.body._id;
        Skill.findOne({"_id": ObjectId(id)}, (err, skill) => {
            skill.name = req.body.name;
            skill.save();
            return res.status(200).json(skill);
        })
    },

    deleteSkill: (req, res) => {
        const id = req.body._id;
        Skill.findByIdAndRemove(ObjectId(id), (err) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Skill successfully deleted",
            };
            return res.status(200).json(response);
        });
    },
};
