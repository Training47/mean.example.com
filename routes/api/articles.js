var express = require('express');
var router = express.Router();
var Users = require('../../models/articles');

router.get('/', function(req, res, next) {
  Users.find({},function(err, articles){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'articles': articles});
  });
});

router.get('/:articleId', function(req,res){
  
    var userId = req.params.articleId;
     Users.findOne({'_id':articleId}, function(err, article){
       if(err){
        return res.json({'success':false, 'error': err});
      }
       return res.json({'success':true, 'article': article});
     });
   });

module.exports = router;