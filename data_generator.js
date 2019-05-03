/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {}; // creating an property on the window object which is an empty obj
// creating empty data structures to house home and users
streams.home = [];
streams.users = {};
streams.hashtags = {};
streams.avatars = {};
streams.names = {};
streams.newTweetCount = 0;
// here are the 4 users we have added to the users object. Each starts off as an empty array.
streams.users.matthewyee = [];
streams.users.michaelthompson = [];
streams.users.galvanize = [];
streams.users.marvinHo = [];
streams.users.tri = [];
streams.users.dannypark = [];
streams.avatars.matthewyee = '<img src="assets/matthewyee.png" width="50" alt="Matthew Yee Profile Picture">';
streams.avatars.michaelthompson = '<img src="assets/michaelthompson.png" width="50" alt="Michael Thompson Profile Picture">';
streams.avatars.galvanize = '<img src="assets/galvanize.png" width="50" alt="Galvanize Profile Picture">';
streams.avatars.marvinHo = '<img src="assets/marvinho.jpg" width="50" alt="Marvin Ho Profile Picture">';
streams.avatars.tri = '<img src="assets/tri.png" width="50" alt="Tri Profile Picture">';
streams.avatars.dannypark ='<img src="assets/dannypark.png" width="50" alt="Danny Park Profile Picture">';
streams.avatars.visitor = '<img src="assets/visitor.png" width="50" alt="Visitor Profile Picture">';
streams.names.matthewyee = 'Matthew Yee';
streams.names.michaelthompson = 'Michael Thompson';
streams.names.galvanize = 'Galvanize';
streams.names.marvinHo = 'Marvin Ho';
streams.names.tri = 'Tri';
streams.names.dannypark = 'Danny Park';
streams.names.visitor = 'Visitor Person';

// adding a property to the window object which is just an Array of the stream users so it should be [shawndrost, sharksforcheap, mracus, douglascalhoun]
window.users = Object.keys(streams.users);
window.visitor = [];

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  // from the tweet that was created we get the user
  var username = newTweet.user;
  // Find the users tweet stream array and push the new tweet into it
  if (username === 'visitor') {
    visitor.push(newTweet);
  } else {
    streams.users[username].push(newTweet);
  }
  // Push the new tweet into the main home property which holds ALL the tweets in order?
  streams.home.push(newTweet);

  var tweetHashtag = newTweet.message.split("#")[1] ? `#${newTweet.message.split("#")[1]}` : '';
  var hashtagTable = streams.hashtags;
    if (tweetHashtag.length > 0) {
      tweetHashtag in hashtagTable ? hashtagTable[tweetHashtag]++ : hashtagTable[tweetHashtag] = 1;
  }

  streams.newTweetCount++;
  document.title = `(${streams.newTweetCount}) Twittler`;
  $('#refreshArea').children('p').text(`View ${streams.newTweetCount} new Tweets`);
  $('#refreshArea').children('p').addClass('updated');
};

// utility function to find random element in an array (to get the random words)
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator - like madlibs
var opening = ['just', '', '', '', '', 'ask me how I', 'completely', 'productively', 'efficiently', 'last night I', 'the president', 'that wizard', 'a ninja', 'a seedy old man', 'I made a mistake when I','Drunk me', 'help me'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat','marvin','matthew','husky', 'koolaid','whisky','vodka', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#coder', '#hackreactor','#seattle', '#thestruggleisreal', '#forreal', '#ballin', '#twittler', '#yolo', '#ftw', '#done','', '', '', ''];

// creates random message from the set of words above
var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  // create tweet object which olds the user, message, and Date object (which gets the time)
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  // the tweet is added...but to what?
  addTweet(tweet);
};

// By default 10 tweets are created with the generateRandomTweet function
for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var getRandomIntInclusive = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function seems to generate a random tweet between every ??? seconds and ??? seconds
var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, getRandomIntInclusive(20, 40) * 1000);
};

//above function is immeditately called (why not use an IIFE?)
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
// Takes in a message (probably as a string)
var writeTweet = function(message){
  // There needs to be a visitor property on the global window? Why not just add it as a user?
  // We can make any made with writeTweet be added to this new 'visitor' user instead of on some.
  // To avoid having random tweets made by the visitor use this function to create that user if it doesn't exist yet.

  // If first tweet then create the visitor
  if(!visitor){
    //throw new Error('set the global visitor property!');
    visitor = true;
    streams.users.visitor = [];
    users.push('visitor');
  }
  // all of the below just adds a tweet to the stream that a 'visitor' just made.
  var tweet = {};
  tweet.user = 'visitor';
  tweet.message = message;
  tweet.created_at = new Date();
  addTweet(tweet);
};
