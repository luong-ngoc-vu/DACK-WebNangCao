const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
    idContract: {
        type: Number,
    },
    point: {
        type: Number
    },
    titleEvaluation: {
        type: String,
    },
    contentEvaluation: {
        type: String,
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
    imageTeacher: {
        type: String,
    },
    imageStudent: {
        type: String,
    },
});


const ContractModel = mongoose.model('evaluations', ContractSchema);

module.exports = ContractModel;
