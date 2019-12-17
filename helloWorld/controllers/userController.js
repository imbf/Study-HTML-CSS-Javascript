var database = require('../database');
var User = require('../models/user');

exports.userList = function(req, res){
    res.render('userList', {title:'사용자 목록', users:database});
    console.log(database)
}
exports.addUser_get = function(req, res){
    res.send('아직 구현되지 않았음')
}
exports.addUser_post = function(req, res){
    res.send('아직 구현되지 않았음')
}
exports.deleteUser = function(req, res){
    res.send('아직 구현되지 않았음')
}
exports.updateUser = function(req, res){
    res.send('아직 구현되지 않았음')
}
exports.userInfo = function(req, res){
    var uid = req.params.uid;
    var i=0;
    // search for that user information.
    for(i=0;i<database.length;i++){
        if(database[i].uid==uid)
            break;
    }
    res.render('showUserInfo', {title:'사용자 정보', user:database[i]})
}

