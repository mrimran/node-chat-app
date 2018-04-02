class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);

        return user;
    }

    removeUser (id) {
        var currentUser = this.getUser(id);
        this.users = this.users.filter((user) => user.id !== id);
        return currentUser;
    }

    getUser (id) {
        var currentUser = this.users.filter((user) => user.id === id);
        return currentUser[0];//undefined when index not found
    }

    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var nameArray = users.map((user) => user.name);

        return nameArray;
    }
}

module.exports = {Users};