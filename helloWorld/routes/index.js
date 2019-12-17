var express = require('express');
var database = require('../database');
var router = express.Router();

// GET home page. Users 페이지로 redirect 한다.
router.get('/', function(req, res, next){
  res.render('index', {title:'사용자 정보 관리웹 사이트', numUsers:database.length});
});
module.exports = router;
