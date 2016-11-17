var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

var dbconf;

if (process.env.NODE_ENV == 'PRODUCTION'){
  var fs = require('fs');
  var path = require('path');
  var fn = path.join(__dirname, 'config.json');
  var data = fs.readFileSync(fn);
  var conf = JSON.parse(data);
  dbconf = conf.dbconf;
} else {
  dbconf = 'mongodb://localhost/event_site';
}

var User = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  artistsFollowing: [{type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}],
},
{
  timestamps: true
});
User.plugin(passportLocalMongoose, {usernameField: 'email'});

var Artist = new mongoose.Schema({
  name: String,
  fullNname: String,
  active: Boolean,
  bio: String,
  addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{
  timestamps: true
});
Artist.plugin(URLSlugs('name'));

var Event = new mongoose.Schema({
  artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
  date: Date,
  notes: String,
  addedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
},
{
  timestamps: true
});

var Event = mongoose.model('Event', Event);

//Subtypes of Event
var PerformanceEvent = Event.discriminator('Performance', new mongoose.Schema({
  ticketInfoURL: String,
  locationName: String,
  locationCity: String,
  locationState: String,
  locationCountry: String
}));

var ReleaseEvent = Event.discriminator('Release', new mongoose.Schema({
  releaseName: String,
  releaseType: {type: String, enum: ['Album', 'Single', 'Other']}
}));


mongoose.model('User', User);
mongoose.model('Artist', Artist);

mongoose.connect(dbconf);


