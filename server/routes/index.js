var express = require('express');
var Feature = require('../models/Feature.js');
var Step = require('../models/Step.js');
var request = require('request');
var moment = require('moment');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Main' });
});

router.get('/api/features', function (req, res) {
  Feature.find(function (err, features, count) {
    if (err) throw err;

    res.end(JSON.stringify(features));
  })
});
router.post('/api/features', function (req, res) {
  new Feature({
    title: req.body.title,
    description: req.body.description,
    scenarios: req.body.scenarios
  }).save(function (err, feature, count) {
      if (err) throw err;

      res.end(JSON.stringify(feature));
    });
});
router.delete('/api/features', function (req, res) {
  Feature.findById(req.body._id, function (err, feature) {
    if (err) throw err;

    feature.remove(function (err, feature) {
      res.end(JSON.stringify({success: true}));
    });
  });
});

router.get('/api/steps', function(req, res) {
    Step.find(function(err, steps, count) {
        if (err) throw err;

        res.end(JSON.stringify(steps));
    });
});
router.post('/api/steps', function(req, res) {
    Step.find({ pattern: req.body.pattern }, function(err, steps) {
        if (steps.length) {
            res.end(JSON.stringify(steps[0]));
        } else {
            new Step({
                pattern: req.body.pattern
            }).save(function(err, step, count) {
                if (err) throw err;

                res.end(JSON.stringify(step));
            });
        }
    });
});

router.get('/last-deploy', function(req, res) {
    if (!process.env.HEROKU_TOKEN || !process.env.HEROKU_APP_URL) {
        res.status(404).end();
        return;
    }

    var herokuToken = process.env.HEROKU_TOKEN;
    var herokuApiUrl = process.env.HEROKU_APP_URL;

    request({
        url: herokuApiUrl,
        headers: {
            'Accept': 'application/vnd.heroku+json; version=3',
            'Authorization': 'Bearer ' + herokuToken
        }
    }, function(err, response, body) {
        if (err) throw err;
        var json = JSON.parse(body);

        res.redirect('https://img.shields.io/badge/Last%20deploy-' + moment(json.updated_at).fromNow() + '-6762A6.svg')
    });
});

router.get('*', function(req, res) {
  res.render('index', { title: 'Main' });
});

module.exports = router;
