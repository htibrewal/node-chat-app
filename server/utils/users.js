class Users {
  constructor () {
    this.users = [];      //set to empty array
    this.rooms = [];
  }

  addUser (id, name, room) {
    var x = 0;
    this.rooms.forEach((Room) => {
      if (room == Room) {
        x++;
      }
    });

    if (x==0)
      this.rooms.push(room);

    console.log(this.rooms);

    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    //return user that was removed
    var user = this.users.filter((user) => user.id === id)[0];

    if (user) {
      var list = this.getUserList(user.room);
      if(list.length == 1) {
        this.rooms = this.rooms.filter((room) => room != user.room);
      }

      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;        //regardless whether it existed or not, we will return it
  }
  checkName (name) {
    var user = this.users.filter((user) => user.name == name)[0];

    return user == undefined;
  }
  getUser (id) {
    var user = this.users.filter((user) => user.id === id);

    return user[0];

    //return this.users.filter((user) => user.id === id)[0]                given by Andrew
  }
  getUserList (room) {
    var usersList = this.users.filter((user) => user.room === room);      //contains only those users which have room as user.room
    var namesArray = usersList.map((user) => user.name);      //maps the obj to user.name (a string) since thah is what we want to store

    return namesArray;
  }
}

module.exports = {Users};






// class Person {
//     constructor () {
//
//     }
// }
