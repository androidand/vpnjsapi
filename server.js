const express = require('express'); // Express.js
const axios = require('axios'); //HTTP request with promises
var app = express();
var port = 4000;

const tmdbApiKey = require('./tmdbapikey')['tmdbapikey'];

app.get('/', (req,res) => {
  console.log(req);
  getTrailerKey(req.query.url).then((v) => {
    console.log(v);

    if (v == null) {
      res.status(404).send({'error': 'no results'});
    }
    else {
      res.status(200).send({'trailer': `https://www.youtube.com/watch?v=${v}`});
    }
      
  
  });
        
});

app.listen(port, () => {
  console.log("API on port:" + port);
});

//Export the api-server-app for testing
module.exports = app;


 async function getTrailerKey (url) {

   let key = await axios.get(url).then((via) => {
    let imdbId = via.data._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;
    let themoviedb = axios.get(`https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbApiKey}&external_source=imdb_id`);
    return themoviedb;
  }).then((themoviedb) => {
    let movieId = themoviedb.data.movie_results[0].id
    //console.log(movieId);
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`)
  }).then((videos) =>{
    let key = videos.data.results[0].key;
    //console.log(key);
  return key;
  })
  .catch((e) => {
    console.log("TrailerKeyError: ",e);
  })

return key;

}
