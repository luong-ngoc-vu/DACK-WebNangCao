// const config = require('config.json');
const bcrypt = require('bcryptjs');
const normalUser = require('../models/normalUser');

module.exports = {
    getAll,
    getById,
    update,
    getByEmail
};


async function getAll() {
    return await normalUser.find().select('-hash');
}

async function getById(id) {
    return await normalUser.findById(id).select('-hash');
}
async function getByEmail(email) {
    return await normalUser.findOne({"email": email}).select('-hash');
}


async function update(email, userParam) {
    const user = await normalUser.findOne({"email": email});
    // validate
    if (!user) throw 'User not found';
    // if (user.username !== userParam.username && await normalUser.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
