require("dotenv").config();

// Requires
var axios = require("axios");
var moment = require("moment");
moment().format();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


// Import Spotify API Keys
var spotify = new Spotify(keys.spotify);

// Global Variables
var action = process.argv[2];
var input = process.argv.slice(3).join("+");

// Function for Bands in Town
function bit(bitInput) {
    axios.get("https://rest.bandsintown.com/artists/" + bitInput + "/events?app_id=codingbootcamp")
        .then (function(response) {
            //console.log("BIT Data: ", response.data[0]);   //ojects or arrays
    
            var concertTime = response.data[0].datetime

            console.log(`Name of Venue: ${response.data[0].venue.name}`);
            console.log(`Venue Location: ${response.data[0].venue.country}`);
            console.log(`Event Date: ${moment(concertTime).format("MM/DD/YYYY")}`)
    });
};

// Function for Spotify
function spot() {
    var spotSong = process.argv[3];

    if (spotSong === undefined) {
        spotSong = ""
    }
    
    spotify.search({ type: 'track', query: spotSong }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(`Name of Artist or Band: ` + data.tracks.items[0].artists[0].name);
        console.log(`Name of the Song: ` + data.tracks.items[0].name);
        console.log(`Song Preview: ` + data.tracks.items[0].external_urls.spotify);
        console.log(`Album: ` + data.tracks.items[0].album.name);
       
       //console.log(data.tracks.items[0].external_urls.spotify); 
      });       
};

// Function for OMDB
function o() {
    var oTitle = process.argv.slice(3).join("+");

    if (oTitle === undefined) {
        oTitle = "Mr. Nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + oTitle + "&y=&plot=short&apikey=trilogy")
        .then (function(response) {
            //console.log(response.data);
  
            console.log(`Movie Title: ${response.data.Title}`);
            console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country of Production: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
        
        });
     }
// //Function for Do What it Says 
// function dwis() {
    //fs.readFile

//     var split (",");
//     var song = 
//     var command = 
// }

// Switch Case 
function Switch(act, inp) {
switch(act) {
    case "concert-this":
        return bit(inp);
    case "spotify-this-song":
        return spot(inp);
    case "movie-this":
        return o(inp);
    case "do-what-it-says":
        return dwis();
    default:
        return console.log("You're doing it wrong!!!")
}
}

Switch(action, input)