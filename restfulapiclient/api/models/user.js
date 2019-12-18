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
    provinceName: {
        type: String
    },
    districtName: {
        type: String
    },
    wardName: {
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
    gender: {
        type: Intl
    },
    curMoney: {
        type: Intl
    },
    teacherTimeDay: [{
        type: [Number]
    }],
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
