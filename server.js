const express = require('express'); // Express.js
const axios = require('axios'); //HTTP request with promises
const app = express();
const port = 4000;
const tmdbApiKey = require('./tmdbapikey')['tmdbapikey'];

app.get('/', (req,res) => {
 if (req.query.url == null) {
  res.status(400).send({'error': 'Url parameter required'});
 }
 else {
  getTrailerKey(req.query.url).then((v) => {
    if (v == null) {
      res.status(404).send({'error': 'No results'});
    }
    else {
      res.status(200).send({'trailer': `https://www.youtube.com/watch?v=${v}`});
    } 
  });
 }      
});

app.listen(port, () => {
  console.log("API on port:" + port);
});

module.exports = app; //Export the api-server-app for testing

async function getTrailerKey (url) {

   let key = await axios.get(url).then((via) => {
    let imdbId = via.data._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;
    let themoviedb = axios.get(`https://api.themoviedb.org/3/find/${imdbId}?api_key=${tmdbApiKey}&external_source=imdb_id`);
    return themoviedb;
  }).then((themoviedb) => {
    let movieId = themoviedb.data.movie_results[0].id
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`)
  }).then((videos) =>{
    let key = videos.data.results[0].key;
  return key;
  })
  .catch((e) => {
    console.log("TrailerKeyError: ",e['code']);
  })

return key;
}
