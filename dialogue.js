const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dialogueSchema = new Schema({
    name:String,
    genre:String,
    authorid:String
});

module.exports = mongoose.model('Dialogue', dialogueSchema);