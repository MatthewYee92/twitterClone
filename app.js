$(document).ready(function(){

  jQuery("time.timeago").timeago();

  const refreshStream = function(element) {
    // Clear the tweets so we can rebuild it
    $('.stream').empty();
    $('.hashtags').empty();
    $('#profile').empty();

    // Reset the new tweet counter only if we refreshed all the tweets and not just filtered some out
    if (!element) {
      streams.newTweetCount = 0;
      // Title and text reset on tweet stream refresh
      document.title = 'Twiddler';
      $('#refreshArea').children('p').text('Refresh Tweets');
      $('h2').text('Tweet Stream');
    }

    var allTweets = streams.home.slice();
    // If no user/hashtag/search passed in then show all tweets
    if (users.includes(element) || element === 'visitor') {
      $('h2').text(`${element}'s Tweets`);
      allTweets = allTweets.filter(function(tweet) {
        return tweet.user === element;
      });
    } else if (typeof element === 'string' && element.startsWith('#')) {
      $('h2').text(`${element}`);
      allTweets = allTweets.filter(function(tweet) {
        return tweet.message.includes(element);
      });
    } else if (typeof element === 'string') {
      $('h2').text(`Searching for: ${element}`);
      allTweets = allTweets.filter(function(tweet) {
        return tweet.message.includes(element) || tweet.user.includes(element);
      });
    }

    // Render tweets
    var index = allTweets.length - 1;
    while(index >= 0) {
      var tweet = allTweets[index];
      // Split out the hashtag if there is one in the tweet
      var tweetMessage = tweet.message.split("#")[0];
      tweetMessage = tweetMessage[0].toUpperCase() + tweetMessage.slice(1);
      var tweetHashtag = tweet.message.split("#")[1] ? `<span class="hashtag">#${tweet.message.split("#")[1]}</span>` : '';

      $('.stream').append(`<li><span class="${tweet.user}">${streams.avatars[tweet.user]}</span><p><span class="${tweet.user}"><strong>${streams.names[tweet.user]}</strong>  @${tweet.user}</span></p><p>${tweetMessage} ${tweetHashtag}</p> <p><span class="timestamp">${jQuery.timeago(tweet.created_at)}</span></p></li>`);
      index -= 1;
    }

    $('.tweets').scrollTop(0);
    // Render hashtags list
    renderWorldwideTrends();
    renderVisitorProfile();
  }

  const renderWorldwideTrends = function() {
    for (hashtag in streams.hashtags) {
      $('.hashtags').append(`<li><span class="hashtag">${hashtag}</span> - ${streams.hashtags[hashtag]}</li>`);
    }
  }

  const renderVisitorProfile = function() {
    let visitorTweetCount = visitor.length;
    $('#profile').append('<span class="visitor"><img src="assets/visitor.png" width="120" alt="Visitor Profile Picture"></span>');
    $('#profile').append(`<h3>Visitor</h3>`);
    $('#profile').append(`<p>@visitor</p>`);
    $('#profile').append(`<p>Tweets: ${visitorTweetCount}</p>`);
  }

  // Handlers
  $('#refreshArea').on('click', function() {
    refreshStream();
    $('#refreshArea').children('p').removeClass('updated');
  });

  $('.group').on('click', 'span', function() {
    // When the username span is clicked refresh the stream to only show their tweets
    let elementClicked = $(this).attr('class')
    if (users.includes(elementClicked) || elementClicked === 'visitor') {
      refreshStream(elementClicked);
    }
    if (elementClicked === 'hashtag') {
      refreshStream($(this).text());
    }
  });

  $('.searchButton').click(function() {
    let searchTerm = $(this).parent().find('.searchInput');
    refreshStream(searchTerm.val());
    searchTerm.val('');
  });

  $('.searchInput').keypress(function(key) {
    if(key.which == 13) {
      let searchTerm = $(this);
      refreshStream(searchTerm.val());
      searchTerm.val('');
    }
  });

  $('.newTweetText').keypress(function(key) {
    if(key.which == 13) {
      let message = $(this);
      if (message.length > 0) {
        writeTweet(message.val());
      }
      refreshStream();
      $('#refreshArea').children('p').removeClass('updated');
      message.val('');
    }
  }); 

  $('header').on('click', 'div', function() {
    refreshStream();
    $('#refreshArea').children('p').removeClass('updated');
  });

  // Initial tweets
  refreshStream();
});