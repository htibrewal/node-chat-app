const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Andrew',
      room: 'Node Course'
    }];

  });

  it('should add new user', () => {
    var usersObj = new Users();
    var user = {
      id: '123',
      name: 'Harsh',
      room: 'The party'
    };

    var resUser = usersObj.addUser(user.id, user.name, user.room);

    expect(usersObj.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should contain this name', () => {
    var res = users.checkName('Jen');

    expect(res).toBe(false);
  });

  it('should not contain this name', () => {
    var res = users.checkName('Harsh');

    expect(res).toBe(true);
  });

  it('should find user', () => {
    var user = users.getUser('2');

    expect(user.id).toBe('2');
  });

  it('should not find user', () => {
    var user = users.getUser('128');

    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');        //users has been defined above which contains the data

    expect(userList).toEqual(['Mike', 'Andrew']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');        //users has been defined above which contains the data

    expect(userList).toEqual(['Jen']);
  });
});
