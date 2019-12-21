const User = require('../models/user');
const Contract = require('../models/contract');
const ObjectId = require('mongodb').ObjectID;

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
        const listContractByIdStudent = await Contract.find({"idStudent": idStudent});
        return res.status(200).json(listContractByIdStudent)
    },
    getListContractByIdTeacher: async (req, res) => {
        const idTeacher = req.params.idTeacher;
        const listContractByIdTeacher = await Contract.find({"idTeacher": idTeacher});
        return res.status(200).json(listContractByIdTeacher)
    },

    changeStatusAndUpdateMoney: async (req, res) => {
        const idContract = req.params.idContract;
        const idStudent = req.params.idStudent;
        const idTeacher = req.params.idTeacher;
        const status = req.params.status;

        console.log(idStudent + ", " + idTeacher);

        await Contract.findOne({"idContract": idContract}, async (err, contract) => {
            await User.findOne({"_id": ObjectId(idTeacher), "typeUser": 2}, async (err, teacher) => {
                if (!teacher.totalMoney) {
                    teacher.totalMoney = 0;
                }
                teacher.totalMoney = teacher.totalMoney + contract.totalMoneyContract;
                await teacher.save();
            });
            await User.findOne({"_id": ObjectId(idStudent), "typeUser": 1}, async (err, student) => {
                student.curMoney = student.curMoney - contract.totalMoneyContract;
                await student.save();
            })
        });

        await Contract.updateOne({idContract: idContract}, {
            $set: {status: status}
        }).then(() => res.json({message: "Change success!"}))
            .catch(err => next(err));
    },

    changeStatus: async (req, res) => {
        const idContract = req.params.idContract;
        const status = req.params.status;
        await Contract.updateOne({idContract: idContract}, {
            $set: {status: status}
        }).then(() => res.json({message: "Change success!"}))
            .catch(err => next(err));
    },

    checkContractPendingHiring: async (req, res) => {
        const idStudent = req.params.idStudent;
        const idTeacher = req.params.idTeacher;

        let hiring = false;
        const contracts = await Contract.find({"idTeacher": idTeacher, "idStudent": idStudent});
        contracts.map(contract => {
            if (contract.status === 0 || contract.status === 1) {
                hiring = true;
            }
        });

        return res.status(200).json(hiring);
    },

    checkContractHired: async (req, res) => {
        const idStudent = req.params.idStudent;
        const idTeacher = req.params.idTeacher;

        let hired = false;
        const contracts = await Contract.find({"idTeacher": idTeacher, "idStudent": idStudent});
        contracts.map(contract => {
            if (contract.status === 2) {
                hired = true;
            }
        });

        return res.status(200).json(hired);
    },

    complaintStudent: async (req, res) => {
        const idContract = req.params.idContract;
        const idStudent = req.params.idStudent;
        const noiDungKhieuNaiHS = req.params.noiDungKhieuNaiHS;
        await Contract.updateOne({idContract: idContract, idStudent: idStudent}, {
            $set: {noiDungKhieuNaiHS: noiDungKhieuNaiHS}
        }).then(() => res.json({message: "Student complains successfully!"}))
            .catch(err => next(err));
    }
};
