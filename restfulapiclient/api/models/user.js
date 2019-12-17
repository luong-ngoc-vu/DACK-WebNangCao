const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    addressCity: {
        type: String
    },
    address: {
        type: String
    },
    moreInfo: {
        type: String
    },
    skills: [{
        type: String
    }],
    typeUser: {
        type: Intl,
        require: true
    },
    levelStudy: {
        type: String
    },
    curPosition: {
        type: String
    },
    certificates: {
        type: String
    },
    school: {
        type: String
    },
    money: {
        type: Intl
    },
    curMoney: {
        type: Intl
    },
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
