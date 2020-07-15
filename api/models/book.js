const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookSchema);
