const userToSession = new Map();

const setUser = (id, user) => {
    userToSession.set(id, user);
};

const getUser = (id) => {
    return userToSession.get(id);
};

module.exports = { setUser, getUser };
