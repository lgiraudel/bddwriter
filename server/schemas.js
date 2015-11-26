var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feature = new Schema({
    title: String,
    description: String,
    scenarios: [{title: String, description: String}]
});

mongoose.model('Feature', Feature);
mongoose.connect('mongodb://localhost/bddwriter');