var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


/*
 * API Endpoint: /follow
 * Method: PUT
 * Login Required: Yes
 * 
 * Adds the artist identified by artistID in the request body to the current
 * user's list of artists they follow
 */
router.put('/follow', function(req, res){
  var artistID = req.body.artistID;

  if (!req.user){
    res.status(401);
    res.json({error: 'Not logged in'});
    return;
  }

  if (!artistID){
    res.status(400);
    res.json({error: 'No artistID specified'});
    return;
  }
  
  //Only adds the artistID if the user is not already following
  req.user.artistsFollowing.addToSet(artistID);
  req.user.save(function(err, user){
    if (err){
      console.log(err);
    } else {
      res.json({user: user});
    }
  });
});

router.delete('/unfollow', function(req, res){
  var artistID = req.body.artistID;

  if (!req.user){
    res.status(401);
    res.json({error: 'Not logged in'});
  }
  
  if (!artistID){
    res.status(400);
    res.json({error: 'No artistID specified'});
    return;
  }
  req.user.artistsFollowing.pull(artistID);
  req.user.save(function(err, user){
    if (err){
      console.log(err);
    } else {
      res.json({user: user});
    }
  });
});

module.exports = router; 
