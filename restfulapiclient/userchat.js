const users = [];

const addUser = ({id, name}) => {
    let user = getUserByName(name);
    if (!user) {
        user = {id, name, online: true};
        users.push(user);
    } else {
        user.id = id;
        user.online = online;
    }
    return {user};
};
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);
const getUserByName = (name) => users.find((user) => user.name === name);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom, getUserByName};
