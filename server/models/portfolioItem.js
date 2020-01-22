const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioItemSchema = new Schema({
  title: { type: String, maxlength: 256, required: true },
  company: { type: String, maxlength: 256, required: true },
  position: { type: String, maxlength: 256, required: true },
  location: { type: String, maxlength: 128, required: true },
  description: { type: String, maxlength: 2048, required: true },
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
});

module.exports = mongoose.model('PortfolioItem', portfolioItemSchema);
