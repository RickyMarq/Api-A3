const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    name: String,
    year: Number,
    urlImage: String,
    rate: Number,
});

module.exports = mongoose.model('AlbumSchema', AlbumSchema)