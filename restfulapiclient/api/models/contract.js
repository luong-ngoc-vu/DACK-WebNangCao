const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
    idContract: {
        type: Number,
        required: true,
        unique: true,
    },
    idStudent: {
        type: String,
    },
    idTeacher: {
        type: String,
    },    
    nameStudent: {
        type: String,
    },
    nameTeacher: {
        type: String,
    },
    genderStudent: {
        type: String,
    },
    moneyTeacherPerHour: {
        type: Number,
    },
    totalMoneyContract: {
        type: Number
    },
    numberOfLesson: {
        type: Number
    },
    address: {
        type: String
    },
    provinceName: {
        type: String
    },
    districtName: {
        type: String
    },
    wardName: {
        type: String
    },
    status: {
        type: String
    },
    hourPerLesson: {
        type: Number
    },
    note: {
        type: String
    },
    skills: [{
        type: String
    }],
    schedule: [{
        type: String
    }],
    dateContract: {
        type: Date
    }
});


const ContractModel = mongoose.model('contracts', ContractSchema);

module.exports = ContractModel;