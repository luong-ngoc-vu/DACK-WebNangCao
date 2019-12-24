// const config = require('config.json');
const Messages = require('../models/chatMessage');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getUnreadMessage
};
async function getAll(from, to, limit) {
    console.log(from, to);
    const messages = await Messages.find({ users: { $all: [from, to] } }).sort([['created_at', 'ascending']]);
    const result = [];
    messages.map(mes => {
        result.push({
            id: mes._id,
            user: mes.from,
            text: mes.message_body,
            time: mes.created_at,
            read: mes.message_status
        })
        return 0;
    });
    return result;
}
async function getUnreadMessage(to) {

    const messages = await Messages.find({ "to": to, "message_status": false }).sort([['created_at', 'ascending']]);
    const result = [];
    messages.map(mes => {
        result.push({
            id: mes._id,
            user: mes.from,
            text: mes.message_body,
            time: mes.created_at,
            read: mes.message_status
        })
        return 0;
    });
    return result;
}
async function getById(id) {
    return await Messages.findById(id);
}

async function create(from, to, message, status) {
    if (!status) status = false;
    const mes = new Messages({
        users: [from, to],
        from: from,
        to: to,
        message_body: message,
        message_status: status
    });
    await mes.save();
    return mes;
}

async function update(id) {
    const mes = await Messages.findById(id);

    // validate
    if (mes) {
        Object.assign(mes, { message_status: true });
        await mes.save();
    };
}

async function _delete(id) {
    await Messages.findByIdAndRemove(id);
}