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
        let status = req.params.status;
        status = Number(status);
        console.log(status);
        console.log(typeof status);
        if (status === 2) {
            await Contract.updateOne({idContract: idContract}, {
                $set: {
                    status: status,
                    dateContractEnd: Date.now(),
                    totalMoneyContract: 0,
                    note: "Hợp đồng kết thúc vì khiếu nại"
                }
            }).then(() => res.json({message: "Change success!"}))
                .catch(err => console.log(err));
        } else if (status === 1) {
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
                        idContract: "$idContract",
                        nameTeacher: "$nameTeacher",
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
                        revenue: Math.floor(item.totalProfitAContract / (item.monthEnd - item.monthStart + 1))
                    }));
                }
            } else if (item.monthStart === item.monthEnd) {
                dataRevenue.push({
                    idContract: item.idContract,
                    teacherName: item.nameTeacher,
                    month: item.monthStart,
                    revenue: item.totalProfitAContract,
                })
            }
        });
        return res.status(200).json(dataRevenue);
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

        console.log(typeof quater);
        console.log(typeof year);

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
    },

    getAllNumberForDashboard: async (req, res) => {
        let data = [];
        // Lấy doanh thu trong tháng 12
        const contract1 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date('2019-12-01T00:00:00.000+00:00'),
                            $lte: new Date('2019-12-31T00:00:00.000+00:00')
                        }
                    }
                },
                {
                    $group:
                        {
                            _id: {
                                month: {$month: "$dateContractEnd"},
                            },
                            count: {$sum: "$totalMoneyContract"}
                        }
                }
            ]
        );

        if (contract1.length !== 0)
            data.push(contract1);

        // Lấy all hợp đồng trong năm
        const contract2 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                    }
                },
                {
                    $group:
                        {
                            _id: {month: null},
                            count: {$sum: 1}
                        }
                }
            ]
        );
        if (contract2.length !== 0)
            data.push(contract2);

        // Lấy hợp đồng trong tháng 12
        const contract3 = await Contract.aggregate(
            [
                {
                    $match: {
                        status: 2,
                        dateContractEnd: {
                            $gte: new Date('2019-12-01T00:00:00.000+00:00'),
                            $lte: new Date('2019-12-31T00:00:00.000+00:00')
                        }

                    }
                },
                {
                    $group:
                        {
                            _id: {month: null},
                            count: {$sum: 1}
                        }
                }
            ]
        );
        if (contract3.length !== 0)
            data.push(contract3);

        return res.status(200).json(data);
    },
};
