const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
    idContract: {
        type: Number,
    },
    point:{
      type: Intl
    },
    idStudent: {
        type: String,
    },
    idTeacher: {
        type: String,
    },
    content:{
        type: String,
    },
    nameStudent: {
        type: String,
    },
    nameTeacher: {
        type: String,
    },
});


const ContractModel = mongoose.model('evaluations', ContractSchema);

module.exports = ContractModel;
