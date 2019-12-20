const User = require('../models/user');
const Contract = require('../models/contract');

module.exports = {
    addNewContract: (req, res, next) => {
        const newContract = new Contract({
            idContract: Math.floor(Math.random() * 99999),
            idStudent: req.body.idStudent,
            idTeacher: req.body.idTeacher,
            nameStudent: req.body.nameStudent,
            nameTeacher: req.body.nameTeacher,
            genderStudent: req.body.genderStudent,
            moneyTeacherPerHour: req.body.moneyTeacherPerHour,
            totalMoneyContract: req.body.totalMoneyContract,
            numberOfLesson: req.body.numberOfLesson,
            address: req.body.address,
            provinceName: req.body.provinceName,
            districtName: req.body.districtName,
            wardName: req.body.wardName,
            hourPerLesson: req.body.hourPerLesson,
            note: req.body.note,
            skills: req.body.skills,
            schedule: req.body.schedule,
            dateContract: new Date(req.body.dateContract),
            status: 0,
        });
        newContract.save().then(contract => {
            res.status(200).json(contract);
        }).catch(err => {
            res.status(400).json(err);
        })
    },

    getListContractByIdStudent: async (req, res) => {
        const idStudent = req.params.idStudent;
        const listContractByIdStudent = await Contract.find({ "idStudent": idStudent });
        return res.status(200).json(listContractByIdStudent)
    },
    getListContractByIdTeacher: async (req, res) => {
        const idTeacher = req.params.idTeacher;
        const listContractByIdTeacher = await Contract.find({ "idTeacher": idTeacher });
        return res.status(200).json(listContractByIdTeacher)
    },

    changeStatus: async (req, res) => {
        const idContract = req.params.idContract;
        const status = req.params.status;
        await Contract.updateOne({ idContract: idContract }, {
            $set: {
                status: status
            }
        }).then(() => res.json({ message: "Change success!" }))
            .catch(err => next(err));
    }
};
