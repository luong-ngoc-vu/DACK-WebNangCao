const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
});

const skill = mongoose.model('skills', schema);
module.exports = skill;
