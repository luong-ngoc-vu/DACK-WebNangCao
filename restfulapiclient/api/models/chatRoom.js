const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {type: String, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
});


const ContractModel = mongoose.model('room', RoomSchema);

module.exports = ContractModel;
