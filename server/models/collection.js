var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    //true is private, false is not private
    privacy: Boolean,
    owner: String,
    image: [{type:String}],
    name: String,
    description: String,
    rating: Number
});

module.exports = mongoose.model('Collection', CollectionSchema);