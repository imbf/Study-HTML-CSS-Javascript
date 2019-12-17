// 데이터베이스로 빈 리스트를 만든 후 데이터베이스에 2명의 사용자를 추가하였다.
var User = require('./models/user');
var database = [];
database.push(new User('사용자1', '010-111-1111', 'user1@mycom'));
database.push(new User('사용자2', '010-222-2222', 'user2@myhome'));
module.exports = database;