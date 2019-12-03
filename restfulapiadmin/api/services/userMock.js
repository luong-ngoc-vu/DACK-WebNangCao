const jwt = require('jsonwebtoken');
const Role = require('../../_helpers/roles');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.RootAdmin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.Admin }
];

module.exports = {
    authenticate,
    getAll,
    getById,
    create
};
const secret = process.env.JWT_SECRET || 'sdfsadfkljv1028ukaf;jsdfs;asdf24*227';
async function authenticate({ username, password }) {
    console.log(username, password);
    const user = users.find(u => u.username === username && u.password === password);
    console.log('user', user);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
async function create({ username, password }) {
    const user = users.push({
        id:3,
        username,
        password,
        role: Role.Admin
    });
    console.log(users);
    return user;
}