var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (!process.env.DB) {
    var env = require('node-env-file');
    env(__dirname + '/../.env');
}

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

mongoose.connect(process.env.DB);
