var express = require('express');
var router = express.Router();
var Feature = require('../server/models/Feature.js');
var Step = require('../server/models/Step.js');

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
router.get('*', function(req, res) {
  res.render('index', { title: 'Main' });
});

module.exports = router;
