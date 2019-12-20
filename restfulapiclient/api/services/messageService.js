// const config = require('config.json');
const Messages = require('../models/chatMessage');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
async function getAll(from, to, limit) {
    return await Messages.find({ users: { "$in": [from, to] } }).sort({ created_at: 'desc' }).limit(limit);
}

async function getById(id) {
    return await Messages.findById(id);
}

async function create(from, to, message) {

    const mes = new Messages({
        users:[from,to],
        from:from,
        to:to,
        message_body:message
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