# Artist Event Tracking Application (working title)

## Overview
This application seeks to provide a centralized location for fans to track events associated with a set of musical artists they choose to "follow". These events could include live performances or album/single releases. The types of events tracked could be expanded on in the future, but I will focus on these two categories for now. Users will select the artists they wish to follow and then an aggregate listing of relevant events for that user will be generated. 

## User Stories
1. As a user, I can browse through a lit of artists and choose the one's I wish to follow
2. As a user, I can get a chronological listing of all events by the artists I've followed
3. As a user, I can add new artists and events to the database

## Data Model
The basic idea for the application requires Users, Artists, Events, and some type of social graph representing which Artists a user "follows". Additionally, Events will be sub-typed using Mongoose's discriminator feature

```javascript
var User = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String
});

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
  releaseType
}));
```
## Wireframes
/ - index for a logged in user (logged out user will just get a listing of some upcoming events in the database)
![index] (documentation/index_wireframe.jpg)

/artist/list - Listing/search page for artists in database
![artist list] (documentation/artists_wireframe.jpg)

/artist/slug - Detail page for a single artist
![artist detail] (documentation/artist_detail_wireframe.jpg)

/event/id - Detail page for an event
![event detail] (documentation/event_detail_wireframe.jpg)

## Site map
![site map] (documentation/site_map.jpg)
 
## Research Topics
* (6 points) Integrate user authentication (using passport)
* (2 points) Use a CSS framework throughout your site (Bootstrap)
