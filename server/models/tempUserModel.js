var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TempUserSchema = new Schema({
    email: String,
    GENERATED_VERIFYING_URL: String
});

module.exports = mongoose.model('TempUser', TempUserSchema);