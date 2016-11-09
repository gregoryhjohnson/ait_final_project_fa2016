var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  artists_following: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}]
});

User.plugin(passportLocalMongoose, {usernameField: 'email'});

var Artist = new mongoose.Schema({
  name: String,
  full_name: String,
  active: Boolean,
  bio: String
});

var Event = new mongoose.Schema({
  artistId: Number,
  date: Date,
  other_info: String,
  added_by_user_id: String
});

var Event = mongoose.model('Event', Event);

//Subtypes of Event
var PerformanceEvent = Event.discriminator('Performance', new mongoose.Schema({
  ticket_info_url: String,
  location_name: String,
  location_city: String,
  location_state: String,
  location_country: String
}));

var ReleaseEvent = Event.discriminator('Release', new mongoose.Schema({
  releaseName: String,
  releaseType: {type: String, enum: ['Album', 'Single', 'Other']}
}));

//ImagePost.plugin(URLSlugs('title'));
mongoose.model('User', User);
mongoose.model('Artist', Artist);

mongoose.connect('mongodb://localhost/event_site');


