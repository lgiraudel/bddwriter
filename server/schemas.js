var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feature = new Schema({
    title: String,
    description: String,
    scenarios: [{
        title: String,
        description: String,
        steps: []
    }]
});
mongoose.model('Feature', Feature);

var Step = new Schema({
    pattern: String
});
mongoose.model('Step', Step);

mongoose.connect('mongodb://localhost/bddwriter');
