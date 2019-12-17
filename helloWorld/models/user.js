function User(name, phone, email){
    var now = new Date();
    this.uid = 'u' + now.getTime();
    this.name = name;
    this.phone = phone;
    this.email = email;
}

User.prototype.getUrl = function(){
    return '/users/info/' + this.uid;
}

module.exports = User;