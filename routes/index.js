var express = require('express');
var router = express.Router();
var Feature = require('../server/models/Feature.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Main' });
});
router.get('/other', function(req, res) {
  res.render('other', { title: 'Other' });
});

router.get('/features', function (req, res) {
  Feature.find(function (err, features, count) {
    if (err) throw err;

    res.end(JSON.stringify(features));
  })
});
router.post('/features', function (req, res) {
  new Feature({
    title: req.body.title,
    description: req.body.description,
    scenarios: req.body.scenarios
  }).save(function (err, feature, count) {
      if (err) throw err;

      res.end(JSON.stringify(feature));
    });
});
router.delete('/features', function (req, res) {
  Feature.findById(req.body._id, function (err, feature) {
    if (err) throw err;

    feature.remove(function (err, feature) {
      res.end(JSON.stringify({success: true}));
    });
  });
});


module.exports = router;
