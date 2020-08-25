//Register a new user
var express = require('express');
var router = express.Router();
var Users = require('../../models/users');
var passport = require('passport');


router.post('/register', function(req,res,next){
  var data = req.body;

  Users.register(new Users({
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name
  }), 
  data.password, 
  function(err, user){

    if(err){

      return res.json({
        success: false, 
        user: req.body, 
        errors: err
      });
      
    }

    return res.json({
      success: true,
      user: user
    });
  
  });

});
//~line 37
router.post('/login', function(req, res, next) {
  //
  passport.authenticate('local', function(err, user, info) {

    if (err) { 
      return res.json({success:false, error: err});
    }

    if (!user) {
      return res.json({success:false, error: info.message });
    }

    req.logIn(user, function(err) {

      if (err) { 
        return res.json({success:false, error: err });
      }

      //we will use a console.log() to test the session data
      // console.log(req.session);

      return res.json({success:true, user: user });

    });
  })(req, res, next);
});
router.delete('/logout', function(req, res){
  req.logout();
  if(!req.session.passport.user){
    return res.json({success: 'true'});
  }else{
    return res.json({success: 'false'});
  }
});
// router.delete('/logout', function(req, res){
//   req.session.destroy(function (err) {
//     if(err){
//       return res.json({success: 'false'});
//     }else{
//       return res.json({success: 'true'});
//     }

module.exports = router;