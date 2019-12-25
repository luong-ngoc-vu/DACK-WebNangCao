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

    thongKeDoanhThuAllTutorByMonth: async (req, res) => {
        const year = req.params.year;
        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date(year + '-01-01T00:00:00.000+00:00'),
                            $lte: new Date(year + '-12-31T00:00:00.000+00:00')
                        }
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

        for (let i = 0; i < n - 1; i += 1) {
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

        console.log(allMonth);
        console.log(monthExistedOnce);

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

    thongKeDoanhThuAllTutorByYear: async (req, res) => {
        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
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

    thongKeDoanhThuAllTutorByQuarter: async (req, res) => {
        const year = req.params.year;

        const listData = [];

        const contract1 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date(year + '-01-01T00:00:00.000+00:00'),
                            $lte: new Date(year + '-03-31T00:00:00.000+00:00')
                        }
                    }
                },
                {
                    $group:
                        {
                            _id: "1",
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                }
            ]
        );
        if (contract1.length !== 0)
            listData.push(contract1);

        const contract2 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date(year + '-04-01T00:00:00.000+00:00'),
                            $lte: new Date(year + '-06-30T00:00:00.000+00:00')
                        }
                    }
                },
                {
                    $group:
                        {
                            _id: "2",
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                }
            ]
        );
        if (contract2.length !== 0)
            listData.push(contract2);

        const contract3 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date(year + '-07-01T00:00:00.000+00:00'),
                            $lte: new Date(year + '-09-30T00:00:00.000+00:00')
                        }
                    }
                },
                {
                    $group:
                        {
                            _id: "3",
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                }
            ]
        );

        if (contract3.length !== 0)
            listData.push(contract3);

        const contract4 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date(year + '-10-01T00:00:00.000+00:00'),
                            $lte: new Date(year + '-12-31T00:00:00.000+00:00')
                        }
                    }
                },
                {
                    $group:
                        {
                            _id: "4",
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                }
            ]
        );
        if (contract4.length !== 0)
            listData.push(contract4);

        return res.status(200).json(listData);
    },

    getListTutorAndRevenue: async (req, res) => {
        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                    }
                },
                {
                    $group:
                        {
                            _id: {
                                nameTeacher: "$nameTeacher",
                                imageTeacher: "$imgTeacher"
                            },
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                },
                {
                    $sort:
                        {
                            "revenue": -1
                        }
                },
                {
                    $limit: 5
                }
            ]
        );

        return res.status(200).json(contract);
    },

    getListTutorAndRevenueByMonth: async (req, res) => {
        const month = req.params.month;
        const year = req.params.year;
        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date(year + '-' + month + '-01T00:00:00.000+00:00'),
                            $lte: new Date(year + '-' + month + '-31T00:00:00.000+00:00')
                        }

                    }
                },
                {
                    $group:
                        {
                            _id: {
                                nameTeacher: "$nameTeacher",
                                imageTeacher: "$imgTeacher"
                            },
                            revenue: {$sum: "$totalMoneyContract"}
                        }
                },
                {
                    $sort:
                        {
                            "revenue": -1
                        }
                },
                {
                    $limit: 5
                }
            ]
        );

        return res.status(200).json(contract);
    },

    getListTutorAndRevenuCurrentWeek: async (req, res) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 7);
        const contract = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: today,
                            $lte: tomorrow
                        }
                    }
                },
                {
                    $group:
                        {
                            _id: {
                                nameTeacher: "$nameTeacher",
                                imageTeacher: "$imgTeacher"
                            }
                            ,
                            revenue: {
                                $sum: "$totalMoneyContract"
                            }
                        }
                },
                {
                    $sort:
                        {
                            "revenue": -1
                        }
                },
                {
                    $limit: 5
                }
            ]
        );

        return res.status(200).json(contract);
    },

    getListTutorAndRevenueQuarter: async (req, res) => {
        const quater = req.params.quater;
        const year = req.params.year;

        let contract;

        if (quater === "1") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            dateContractEnd: {
                                $gte: new Date(year + '-01-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-03-31T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: {
                                    nameTeacher: "$nameTeacher",
                                    imageTeacher: "$imgTeacher"

                                },
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    },
                    {
                        $sort:
                            {
                                "revenue": -1
                            }
                    },
                    {
                        $limit: 5
                    }
                ]
            );
        } else if (quater === "2") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            dateContractEnd: {
                                $gte: new Date(year + '-04-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-06-30T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: {
                                    nameTeacher: "$nameTeacher",
                                    imageTeacher: "$imgTeacher"
                                },
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    },
                    {
                        $sort:
                            {
                                "revenue": -1
                            }
                    },
                    {
                        $limit: 5
                    }
                ]
            );
        } else if (quater === "3") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            dateContractEnd: {
                                $gte: new Date(year + '-07-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-09-30T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: {
                                    nameTeacher: "$nameTeacher",
                                    imageTeacher: "$imgTeacher"
                                },
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    },
                    {
                        $sort:
                            {
                                "revenue": -1
                            }
                    },
                    {
                        $limit: 5
                    }
                ]
            );
        } else if (quater === "4") {
            contract = await Contract.aggregate(
                [
                    {
                        $match: {
                            status: 2,
                            dateContractEnd: {
                                $gte: new Date(year + '-10-01T00:00:00.000+00:00'),
                                $lte: new Date(year + '-12-31T00:00:00.000+00:00')
                            }
                        }
                    },
                    {
                        $group:
                            {
                                _id: {
                                    nameTeacher: "$nameTeacher",
                                    imageTeacher: "$imgTeacher"
                                },
                                revenue: {$sum: "$totalMoneyContract"}
                            }
                    },
                    {
                        $sort:
                            {
                                "revenue": -1
                            }
                    },
                    {
                        $limit: 5
                    }
                ]
            );
        }
        return res.status(200).json(contract);
    }
};
