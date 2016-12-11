var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var ensureAuthenticated = require('../middleware').ensureAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
  var eventQuery = Event.find(); 
  if (req.user){
      eventQuery.where('artist').in(req.user.artistsFollowing);
  }
  eventQuery.where('date').gte(new Date()).sort('date');
  eventQuery.populate('artist');
  eventQuery.limit(20);
  eventQuery.exec(function(err, events){
    if(err){
      console.log(err);
    }
    if (req.query.event_type){
      events = events.filter(function(ele){
        return ele.__t == req.query.event_type;
      });
    }
    res.render('index', {user: req.user, events: events});
   });
});

router.get('/register', function(req, res){
  res.render('register', {});
});

router.post('/register', function(req, res){
  User.register(new User({
    email: req.body.email,
    firstName: req.body.first_name,
    lastName: req.body.last_name
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
  var redirectPath = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectPath);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
