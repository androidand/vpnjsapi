# API for movie trailers

Takes the url of the viaplay movie API and returns an url for the trailer of the movie.

### Installation
Make sure to have node 8.5. Clone this repo. In the repo folder, run:
```npm install```

### Example usage:

CLI:
run ```node server.js``` or ```nodemon server.js```
The server is listening on port 4000

In the browser, provide an url to the viaplay API to the server running on localhost, for instance:
```localhost:4000/url=https://content.viaplay.se/pc-se/film/arrival-2016```

### Testing
This project uses chai, mocha and supertest.
With the server running, run:
```mocha```


### Scaling
A load balancer can be used to horizontally scale the API.