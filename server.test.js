//SuperTest to test express http server
//https://github.com/visionmedia/supertest
const request = require('supertest');
const expect = require('expect');
// Mocha + supertest + expect + describe from mocha

//Import the api-server app
var app = require('./server.js').app;


describe('API Server tests', () => {
  describe('GET /', () => {
  

it('should return a trailer url', (done) => {

  request(app)
    .get('/')
    .expect((res) => {
      expect(res.body).toInclude({
        trailer: "https://www.youtube.com/watch?v=8IBNZ6O2kMk"
      });
    })
    .end(done);
});

  }); //describe GET /



}); //</describe id="Server tests">