var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');
var ensureAuthenticated = require('../middleware').ensureAuthenticated;

router.get('/add', ensureAuthenticated, function(req, res){
  res.render('artist_edit', {});
});

router.post('/add', ensureAuthenticated, function(req, res){
  //TODO
});

router.get('/:slug', function(req, res){
  //TODO
});

router.get('/:slug/edit', ensureAuthenticated, function(req, res){
  //TODO
});

router.post('/:slug/edit', ensureAuthenticated, function(req, res){
  //TODO
});

module.exports = router; 
