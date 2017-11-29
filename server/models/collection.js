var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    //true is private, false is not private
    privacy: Boolean,
    owner: String,
    image: [],
    ID: Number
});

module.exports = mongoose.model('Collection', CollectionSchema);