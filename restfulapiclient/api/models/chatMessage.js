const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    users:[{ type: String, require: true }],
    from: { type: String, require: true },
    to: { type: String, require: true },
    message_body: String,
    message_status: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
});


const ContractModel = mongoose.model('message', MessageSchema);

module.exports = ContractModel;
