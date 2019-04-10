require("dotenv").config();


//variables
var keys = require("./keys.js");

var axios = require("axios");


var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var fs = require("fs");


var moment = require('moment');

var userInput = process.argv[2];

var artist = process.argv[3];

switch (userInput) {
    case "concert-this":
        concertThis(artist);
        break;
    case "spotify-this-song":
        spotifyThis(artist);
        break;
    case "movie-this":
        movieThis(artist);
        break;
    case "do-what-it-says":
        doThis(artist);
        break;    
};
//Bands in town
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response)
    {

        var events = response.data;
       // console.log(response)
        //console.log(response.headers.date)
        //console.log(moment(response.headers.date).format("MM/DD/YYYY"))
       //response.data.forEach(function(event){
        //     console.log(event.venue.name);
        //     console.log(`${event.venue.city}, ${event.venue.country}`);
        // })
        for(var i =0; i < 5; i++){
            events[i].datetime;
            console.log('|||||||||||||||||||||||||')
            console.log(moment(events[i].datetime).format("MM/DD/YYYY"));
            console.log(events[i].venue.name);
            console.log(`${events[i].venue.city}, ${events[i].venue.country}`);
        
            
        }
    
    })
    
};

//Spotify 
function spotifyThis(song){
    if(!song){
        song = "The Sign Ace of Base";
    };
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
    
        //console.log(data.tracks.items.artists);
        //for(var i =0; i < response.tracks.items.length; i++)
        {

        var spotifyResults = 
        "--------------------------------------------------------------------" +
        "\nArtist(s): " + response.tracks.items[0].artists[0].name + 
        "\nSong Name: " + response.tracks.items[0].name +
        "\nAlbum Name: " + response.tracks.items[0].album.name +
        "\nPreview Link: " + response.tracks.items[0].preview_url;
        console.log(spotifyResults);
        }
    });
     
};


//OMDB
function movieThis(movie){
    if(!movie){
        movie = "mr nobody";
    }
    axios.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy')
    .then(function(response) {
        //console.log(movie, response);
        var movieResults = 
        "--------------------------------------------------------------------" +
            "\nMovie Title: " + response.data.Title + 
            "\nYear of Release: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nCountry Produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors/Actresses: " + response.data.Actors;
    console.log(movieResults);
    });
    
};

//random.txt

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(',');
        spotifyThis(dataArr[1])

        if (error) {
            return console.log(error);
        }
       
    });
}