const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Imran',
            room: 'Room1'
        }, {
            id: '2',
            name: 'Atif',
            room: 'Room1'
        }, {
            id: '3',
            name: 'Arslan',
            room: 'Room2'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1',
            name: 'Imran',
            room: 'TestRoom'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for Room1', () => {
        var userList = users.getUserList('Room1');

        expect(userList).toEqual(['Imran', 'Atif']);
    });

    it('should return names for Room2', () => {
        var userList = users.getUserList('Room2');

        expect(userList).toEqual(['Arslan']);
    });

    it('should remove 2nd user from the list', () => {
        var removedUser = users.removeUser('2');

        expect(removedUser).not.toEqual(users.users[1]);//because at this stage user 2 is deleted from the actual users list
    });

    it('should not remove a user with wrong id', () => {
        var removedUser = users.removeUser('5');

        expect(removedUser).toEqual(undefined);
    });

    it('should get the current user', () => {
        var currUser = users.getUser('1');

        expect(currUser).toEqual(users.users[0]);
    });

    it('should not get the the invalid id user', () => {
        var currUser = users.getUser('abc');
        
        expect(currUser).toEqual(undefined);
    });
});