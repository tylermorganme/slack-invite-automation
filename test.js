var request = require('request');

var inviteToken = "the most udacious group in the world";
response = ""
request.post({
    url: 'http://localhost:5000/invite',
    form: {
      token: inviteToken
    }
  }, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
  }
)
