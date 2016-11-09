var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ensureAuthenticated = require('../middleware').ensureAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/register', function(req, res){
  res.render('register', {});
});

router.post('/register', function(req, res){
  User.register(new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
    }), req.body.password, function(err, user){
      if (err){
        console.log(err);
        console.log('error registering new User');
        return res.render('register', { user: user});
      }
    
      passport.authenticate('local')(req, res, function(){
        res.redirect('/');
      });  
     
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
