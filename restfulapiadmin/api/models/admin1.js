const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    typeUser: {
        type: Intl,
        require: true
    }
});

AdminSchema.methods.isValidPassword = async function (password) {
    const admin = this;
    return await bcrypt.compare(password, admin.password);
};

const AdminModel = mongoose.model('admins', AdminSchema);

module.exports = AdminModel;
