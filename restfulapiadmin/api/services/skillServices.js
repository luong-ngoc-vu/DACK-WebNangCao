const skill = require('../models/skill');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await skill.find().select('-creator','-createdDate');
}

async function getById(id) {
    return await skill.findById(id);
}

async function create(userParam) {
    if (await skill.findOne({ name: userParam.name })) {
        throw 'name "' + userParam.name + '" is already taken';
    }

    const user = new skill(userParam);

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await skill.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.name !== userParam.name && await skill.findOne({ name: userParam.name })) {
        throw 'name "' + userParam.username + '" is already taken';
    }


    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await skill.findByIdAndRemove(id);
}