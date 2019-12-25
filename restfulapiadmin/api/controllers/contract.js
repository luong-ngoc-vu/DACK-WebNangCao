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

    addNewEvaluation: async (req, res, next) => {
        let averagePoint = 0;
        const newEvaluation = new Evaluation({
            idContract: req.body.idContract,
            idStudent: req.body.idStudent,
            idTeacher: req.body.idTeacher,
            nameStudent: req.body.nameStudent,
            nameTeacher: req.body.nameTeacher,
            titleEvaluation: req.body.titleEvaluation,
            contentEvaluation: req.body.contentEvaluation,
            point: req.body.point,
            imageStudent: req.body.imageStudent,
            imageTeacher: req.body.imageTeacher,
        });

        newEvaluation.save().then(evaluation => {
            res.status(200).json(evaluation);
        }).catch(err => {
            res.status(400).json(err);
        });

        const data = await Evaluation.find({"idTeacher": req.body.idTeacher});

        if (data.length === 0) {
            await User.updateOne({_id: req.body.idTeacher}, {
                $set: {averagePoint: req.body.point}
            }).then(() => res.json({message: "Student complains successfully!"}))
                .catch(err => next(err));
        } else {
            let totalPoint = 0;
            data.map(evaluation => {
                console.log("evaluation.point", evaluation.point);
                totalPoint += evaluation.point;
                averagePoint = Math.floor(totalPoint / (data.length));
            });

            await User.updateOne({_id: req.body.idTeacher}, {
                $set: {averagePoint: averagePoint}
            }).then(() => res.json({message: "Student complains successfully!"}))
                .catch(err => next(err));
        }
    },

    getListEvaluationByIdTeacher: async (req, res, next) => {
        const idTeacher = req.params.idTeacher;
        const listEvauationByIdTeacher = await Evaluation.find({"idTeacher": idTeacher});
        return res.status(200).json(listEvauationByIdTeacher);
    },

    thongKeDoanhThuByMonth: async (req, res) => {
        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                    }
                },
                {
                    $project: {
                        monthStart: {"$month": "$dateContract"},
                        monthEnd: {"$month": "$dateContractEnd"},
                        totalProfitAContract: "$totalMoneyContract",
                    }
                },
            ]
        );

        let dataRevenue = [];

        contract.map(item => {
            if (item.monthEnd > item.monthStart) {
                for (let month = item.monthStart; month <= item.monthEnd; month++) {
                    dataRevenue.push(({
                        idContract: item.idContract,
                        teacherName: item.nameTeacher,
                        month: month,
                        totalProfitForAContract: Math.floor(item.totalProfitAContract / (item.monthEnd - item.monthStart + 1))
                    }));
                }
            } else if (item.monthStart === item.monthEnd) {
                dataRevenue.push({
                    idContract: item.idContract,
                    teacherName: item.nameTeacher,
                    month: item.monthStart,
                    totalProfitForAContract: item.totalProfitAContract,
                })
            }
        });
        let data = [];
        let primaryMonth = [];
        let revenue = 0;
        let n = dataRevenue.length;

        for (let i = 0; i < n; i += 1) {
            for (let j = i + 1; j < n; j += 1) {
                if (dataRevenue[i].month === dataRevenue[j].month) {
                    primaryMonth.push(dataRevenue[i].month);
                    revenue = dataRevenue[i].totalProfitForAContract + dataRevenue[j].totalProfitForAContract;
                    data.push({
                        month: dataRevenue[i].month,
                        revenue: revenue
                    })
                }
            }
        }

        let monthExistedOnce = [];
        let allMonth = [];

        dataRevenue.map(item => {
            allMonth.push(item.month);
        });

        monthExistedOnce = allMonth.filter(function (item) {
            return !primaryMonth.includes(item);
        });

        monthExistedOnce.map(month => {
            dataRevenue.map(item => {
                if (month === item.month) {
                    data.push({
                        month: month,
                        revenue: item.totalProfitForAContract
                    })
                }
            })
        });

        return res.status(200).json(data);
    },

    thongKeDoanhThuByYear: async (req, res) => {
        const idTeacher = req.params.idTeacher;

        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        noiDungKhieuNaiHS: undefined,
                        noiDungKhieuNaiGV: undefined,
                        idTeacher: idTeacher
                    }
                },
                {
                    $group:
                        {
                            _id: {
                                year: {$year: "$dateContractEnd"},
                            },
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                }
            ]
        );
        return res.status(200).json(contract);
    },

    thongKeDoanhThuByQuater: async (req, res) => {

        const idTeacher = req.params.idTeacher;
        const year = req.params.year;
        const quater = req.params.quater;

        let contract;

        if (quater === "1") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            idTeacher: idTeacher,
                            noiDungKhieuNaiHS: undefined,
                            noiDungKhieuNaiGV: undefined,
                            dateContractEnd: {
                                $gte: new Date(year + '-01-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-03-31T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: quater,
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    }
                ]
            );
        } else if (quater === "2") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            idTeacher: idTeacher,
                            noiDungKhieuNaiHS: undefined,
                            noiDungKhieuNaiGV: undefined,
                            dateContractEnd: {
                                $gte: new Date(year + '-04-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-06-30T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: quater,
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    }
                ]
            );
        } else if (quater === "3") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            idTeacher: idTeacher,
                            noiDungKhieuNaiHS: undefined,
                            noiDungKhieuNaiGV: undefined,
                            dateContractEnd: {
                                $gte: new Date(year + '-07-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-09-30T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: quater,
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    }
                ]
            );
        } else if (quater === "4") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            idTeacher: idTeacher,
                            noiDungKhieuNaiHS: undefined,
                            noiDungKhieuNaiGV: undefined,
                            dateContractEnd: {
                                $gte: new Date(year + '-10-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-12-31T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: quater,
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    }
                ]
            );
        }

        console.log(contract);

        return res.status(200).json(contract);
    }
};
