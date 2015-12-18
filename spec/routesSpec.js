var request = require('request');

describe("Router", function() {
  var response = "";
  describe("with no email", function(){
    beforeEach(function(done) {
      //HTTP REQUEST
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
      var inviteToken = "the most udacious group in the world";
      response = "";
      request.post({
          url: 'http://localhost:5000/invite',
          form: {
            token: inviteToken
          }
        }, function(err, httpResponse, body) {
          if (err) {
            response = err;
          } else {
            response = body;
          }
          done();
        }
      )
    });

    it("should return 'Error: no email included in request'", function(done) {
        expect(response).toBe('Error: no email included in request');
        done();
    });
  });

  describe("with no token", function(){
    beforeEach(function(done) {
      //HTTP REQUEST
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
      var inviteToken = "the most udacious group in the world";
      response = "";
      request.post({
          url: 'http://localhost:5000/invite',
          form: {
            email: "tylermorgan1987@gmail.com"
          }
        }, function(err, httpResponse, body) {
          if (err) {
            response = err;
          } else {
            response = body;
          }
          done();
        }
      )
    });

    it("should return 'Error: no token included in request'", function(done) {
        expect(response).toBe('Error: no token included in request');
        done();
    });
  });

  describe("with wrong token", function(){
    beforeEach(function(done) {
      //HTTP REQUEST
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
      var inviteToken = "asdf asdfasdf";
      response = "";
      request.post({
          url: 'http://localhost:5000/invite',
          form: {
            email: "tylermorgan1987@gmail.com",
            token: inviteToken
          }
        }, function(err, httpResponse, body) {
          if (err) {
            response = err;
          } else {
            response = body;
          }
          done();
        }
      )
    });

    it("should return 'Error: incorrect invite token'", function(done) {
        expect(response).toBe('Error: incorrect invite token');
        done();
    });
  });

});
