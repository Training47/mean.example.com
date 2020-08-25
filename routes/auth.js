var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('auth/index', { title: 'User Authentication' });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/auth');
});

router.get('/logout', function(req, res){
    console.log(req.session);
    req.logout();
    console.log(req.session);
  });

module.exports = router;