'use strict';

var app = require('../..');
import request from 'supertest';

var newPgo;

describe('Pgo API:', function() {

  describe('GET /pgo', function() {
    var pgos;

    beforeEach(function(done) {
      request(app)
        .get('/pgo')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pgos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pgos).to.be.instanceOf(Array);
    });

  });

  describe('POST /pgo', function() {
    beforeEach(function(done) {
      request(app)
        .post('/pgo')
        .send({
          name: 'New Pgo',
          info: 'This is the brand new pgo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPgo = res.body;
          done();
        });
    });

    it('should respond with the newly created pgo', function() {
      expect(newPgo.name).to.equal('New Pgo');
      expect(newPgo.info).to.equal('This is the brand new pgo!!!');
    });

  });

  describe('GET /pgo/:id', function() {
    var pgo;

    beforeEach(function(done) {
      request(app)
        .get('/pgo/' + newPgo._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          pgo = res.body;
          done();
        });
    });

    afterEach(function() {
      pgo = {};
    });

    it('should respond with the requested pgo', function() {
      expect(pgo.name).to.equal('New Pgo');
      expect(pgo.info).to.equal('This is the brand new pgo!!!');
    });

  });

  describe('PUT /pgo/:id', function() {
    var updatedPgo;

    beforeEach(function(done) {
      request(app)
        .put('/pgo/' + newPgo._id)
        .send({
          name: 'Updated Pgo',
          info: 'This is the updated pgo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPgo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPgo = {};
    });

    it('should respond with the updated pgo', function() {
      expect(updatedPgo.name).to.equal('Updated Pgo');
      expect(updatedPgo.info).to.equal('This is the updated pgo!!!');
    });

  });

  describe('DELETE /pgo/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/pgo/' + newPgo._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pgo does not exist', function(done) {
      request(app)
        .delete('/pgo/' + newPgo._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
