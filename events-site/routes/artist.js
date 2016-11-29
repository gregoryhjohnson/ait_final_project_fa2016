var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Artist = mongoose.model('Artist');
var Event = mongoose.model('Event');
var Performance = mongoose.model('Performance');
var Release = mongoose.model('Release');

var ensureAuthenticated = require('../middleware').ensureAuthenticated;

router.get('/add', ensureAuthenticated, function(req, res){
  res.render('artist_edit', {});
});

router.post('/add', ensureAuthenticated, function(req, res){
  var artist = new Artist({
    name: req.body.artist_name,
    fullName: req.body.full_name,
    active: req.body.active,
    bio: req.body.bio,
    addedBy: req.user._id
  });

  artist.save(function(err, artist){
    if (err){
      //TODO: error handling lol
      console.log(err);
    } else {
      res.redirect('/artist/'+ artist.slug);
    }
  });
  
});

router.get('/:slug', function(req, res){
  Artist.findOne({slug: req.params.slug}, function(err, artist){
    if (err){
      console.log(err);
    } else {
      var userFollowing = false;
      if (req.user){
        userFollowing = req.user.artistsFollowing.some(function(artistId){
          return artistId.equals(artist._id);
        });
      }

      //Get upcoming events for this artist
      Event.find({
        artist: new ObjectId(artist._id), 
        date: {$gte: new Date()}
      }, function(err, events, count){
        if (err){
          console.log(err);
        } else {
          upcomingEvents = events;        
          res.render('artist_detail', {artist: artist, events: events, userFollowing: userFollowing});
        }
      });
    }
  });
});

router.get('/:slug/edit', ensureAuthenticated, function(req, res){
  //TODO
});

router.post('/:slug/edit', ensureAuthenticated, function(req, res){
  //TODO
});

router.get('/:slug/add_event', ensureAuthenticated, function(req, res){
  Artist.findOne({slug: req.params.slug}, function(err, artist){
    if (err){
      console.log(err);
    } else {
      res.render('event_edit', {artist: artist});
    }
  });
});

router.post('/:slug/add_event', ensureAuthenticated, function(req, res){
  Artist.findOne({slug: req.params.slug}, function(err, artist){
    if (err){
      console.log(err);
    } else {
      var event;
      var eventType = req.body.event_type;
      var date = new Date(req.body.event_date);
      switch (eventType){
        case "performance":
          event = new Performance({
            artist: artist._id,
            date: date,
            notes: req.body.notes,
            addedBy: req.user._id,
          });
          break;
        case "release":
          event = new Release({
            artist: artist._id,
            date: date,
            notes: req.body.notes,
            addedBy: req.user._id,
          });
          break;
        default:
          //TODO: No type selected, abort add event
      }
      event.save(function(err, event){
        res.redirect('/artist/' + artist.slug);
      });
    }
  });
});

module.exports = router; 
