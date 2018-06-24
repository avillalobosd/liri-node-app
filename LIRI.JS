
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require('./keys.js');
var fs = require("fs");
var command = process.argv[2];
var commandfs=process.argv[2];
var song = process.argv;
var song_name="";
var movie_name="";

var t_consumer_key = keys.twitter.consumer_key;
var t_consumer_secret = keys.twitter.consumer_secret;
var t_access_token_keys = keys.twitter.access_token_key;
var t_access_token_secret = keys.twitter.access_token_secret;
var s_id = keys.spotify.id;
var s_secret = keys.spotify.secret;

var client = new Twitter({
    consumer_key: t_consumer_key,
    consumer_secret: t_consumer_secret,
    access_token_key: t_access_token_keys,
    access_token_secret: t_access_token_secret
});

var spotify = new Spotify({
    id: s_id,
    secret: s_secret
  });
//POST TWITTER
// client.post('statuses/update', {status: 'I Love Twitter'})
//   .then(function (tweet) {
//     console.log(tweet);
//   })
//   .catch(function (error) {
//     throw error;
//   })
if (commandfs == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
   
        var dataArr = data.split(",");
      
       
       song_name=(dataArr[1]);
       movie_name=(dataArr[1]);
        command=(dataArr[0]);

        if (command == "my-tweets") {
            var params = { count: 20};
            client.get('statuses/home_timeline', params, function (error, tweets, response) {
                if (!error) {
                    console.log("The last " + tweets.length + " Tweets (Maximum 20)  are:");
                    console.log("");
                    for (var i=0;i<tweets.length;i++){
                    var num=i+1;
                    console.log("Tweet #"+num);
                    console.log("Created at: "+tweets[i].created_at);
                    console.log("Tweet: "+tweets[i].text);
                    console.log(" ");
                    }
                }
            });
        }
        
        
        
        if (command == "spotify-this-song") {
            spotify
            .search({ type: 'track', query: song_name,limit: 1 })
            .then(function(response) {
              console.log("Artist: "+JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
              console.log("Song Name: "+JSON.stringify(response.tracks.items[0].name, null, 2));
              console.log("Preview URL: "+JSON.stringify(response.tracks.items[0].preview_url, null, 2));
              console.log("Album Name: "+JSON.stringify(response.tracks.items[0].album.name, null, 2));
            //   console.log("Album Name: "+JSON.stringify(response, null, 4));
        
        
            })
            .catch(function(err) {
              console.log(err);
            });
          
        }
        
        if (command == "movie-this") {
            if(dataArr.length==1){
                movie_name="Mr. Nobody";
            }
            request("http://www.omdbapi.com/?t="+movie_name+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        
          if (!error && response.statusCode === 200) {
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            // console.log("IMDB Rating: " + JSON.parse(body).Title.rating.Value);
            // console.log("Rotten Tomates Rating: " + JSON.parse(body).Title);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Language of Movie: " + JSON.parse(body).Language);
            console.log("Plot of Movie: " + JSON.parse(body).Plot);
            console.log("Actors in Movie: " + JSON.parse(body).Actors);
            
          }
        });
        
        }
      
      });
  
    } else {
        if (command == "my-tweets") {
            var params = { count: 20};
            client.get('statuses/home_timeline', params, function (error, tweets, response) {
                if (!error) {
                    console.log("The last " + tweets.length + " Tweets (Maximum 20)  are:");
                    console.log("");
                    for (var i=0;i<tweets.length;i++){
                    var num=i+1;
                    console.log("Tweet #"+num);
                    console.log("Created at: "+tweets[i].created_at);
                    console.log("Tweet: "+tweets[i].text);
                    console.log(" ");
                    }
                }
            });
        }
        
        for (var i=3;i<song.length;i++){
        song_name=song_name+song[i]+" ";
        
        }
        for (var i=3;i<song.length;i++){
            movie_name=movie_name+song[i]+"+";
            
            }
        
        
        if (command == "spotify-this-song") {
            spotify
            .search({ type: 'track', query: song_name,limit: 1 })
            .then(function(response) {
              console.log("Artist: "+JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
              console.log("Song Name: "+JSON.stringify(response.tracks.items[0].name, null, 2));
              console.log("Preview URL: "+JSON.stringify(response.tracks.items[0].preview_url, null, 2));
              console.log("Album Name: "+JSON.stringify(response.tracks.items[0].album.name, null, 2));
            //   console.log("Album Name: "+JSON.stringify(response, null, 4));
        
        
            })
            .catch(function(err) {
              console.log(err);
            });
          
        }
        
        if (command == "movie-this") {
            if(song.length==3){
                movie_name="Mr. Nobody";
            }
            request("http://www.omdbapi.com/?t="+movie_name+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        
          if (!error && response.statusCode === 200) {
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            // console.log("IMDB Rating: " + JSON.parse(body).Title.rating.Value);
            // console.log("Rotten Tomates Rating: " + JSON.parse(body).Title);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Language of Movie: " + JSON.parse(body).Language);
            console.log("Plot of Movie: " + JSON.parse(body).Plot);
            console.log("Actors in Movie: " + JSON.parse(body).Actors);
            
          }
        });
        
        }
    }


