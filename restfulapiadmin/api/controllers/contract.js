const Contract = require('../models/contract');

module.exports = {
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

    getAllContract: async (req, res) => {
        const contracts = await Contract.find();
        return res.status(200).json(contracts);
    },

    getContractByStatus: async (req, res) => {
        const status = req.params.status;
        const contracts = await Contract.find({"status": status});
        return res.status(200).json(contracts);
    },

    getContractByIdContract: async (req, res) => {
        const idContract = req.params.idContract;
        const contracts = await Contract.findOne({"idContract": idContract});
        return res.status(200).json(contracts);
    },

    changeStatus: async (req, res) => {
        const idContract = req.params.idContract;
        const status = req.params.status;
        if (status === 2) {
            await Contract.updateOne({idContract: idContract}, {
                $set: {status: status, dateContractEnd: Date.now()}
            }).then(() => res.json({message: "Change success!"}))
                .catch(err => console.log(err));
        } else {
            await Contract.updateOne({idContract: idContract}, {
                $set: {status: status, noiDungKhieuNaiHS: "", noiDungKhieuNaiGV: ""}
            }).then(() => res.json({message: "Change success!"}))
                .catch(err => console.log(err));
        }
    },
};
