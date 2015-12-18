var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function(req, res) {
  res.render('index', { community: config.community,
                        tokenRequired: !!config.inviteToken });
});

router.post('/invite', function(req, res) {
  if (req.body.email && (req.body.token === config.inviteToken)) {
    request.post({
        url: 'https://'+ config.slackUrl + '/api/users.admin.invite',
        form: {
          email: req.body.email,
          token: config.slacktoken,
          set_active: true
        }
      }, function(err, httpResponse, body) {
        // body looks like:
        //   {"ok":true}
        //       or
        //   {"ok":false,"error":"already_invited"}
        if (err) { return res.send('Error:' + err); }
        body = JSON.parse(body);
        if (body.ok) {
          console.log('Success: invitation_successful ' + req.body.email);
          res.send('Success: invitation_successful ' + req.body.email);
        } else {
          console.log('Error: ' + body.error + req.body.email);
          res.send('Error: ' + body.error + req.body.email);
        }
      });
  } else if (!('email' in req.body)) {
    console.log('Error: no email included in request');
    res.send('Error: no email included in request');
  } else if (!('token' in req.body)) {
    console.log('Error: no token included in request');
    res.send('Error: no token included in request');
  } else if (!(req.body.token === config.inviteToken)) {
    console.log('Error: incorrect invite token');
    res.send('Error: incorrect invite token');
  } else {
    console.log('Error: unknown error');
    res.send('Error: unknown error');
  }
});

module.exports = router;
