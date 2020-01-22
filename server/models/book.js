const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  pages: Number,
  price: Number,
});

module.exports = mongoose.model('Book', bookSchema);
