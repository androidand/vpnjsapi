//SuperTest to test express http server
//https://github.com/visionmedia/supertest
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
//var app = require('../server.js');
//var request = supertest(app);
//Start the API server first
var api = supertest.agent('http://localhost:4000');

describe('API Server tests', () => {

it('should return a 400 response', (done) => { 
  api
  .get('/')
  .query({})
  .set('Accept','application/json')
  .expect(400,done);
});

it('should return a 404 response', (done) => { 
  api
  .get('/')
  .query({url: 'nothing'})
  .set('Accept','application/json')
  .expect(404,done);
});

it('should return a trailer url', (done) => { 
  let url = 'https://content.viaplay.se/pc-se/film/arrival-2016';
  let key = 'gwqSi_ToNPs'
  api
  .get('/')
  .query({url})
  .set('Accept','application/json')
  .end((err, res) => {
  	expect(err).to.be.null;
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    expect(res.body).to.eql({ trailer: `https://www.youtube.com/watch?v=${key}`});
  	done();
  });
});


}); //</describe id="Server tests">