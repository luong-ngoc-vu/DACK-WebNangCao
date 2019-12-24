// const config = require('config.json');
const Messages = require('../models/chatMessage');

module.exports = {
    getAll,

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
