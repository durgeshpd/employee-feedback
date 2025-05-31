const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Work Environment', 'Leadership', 'Growth', 'Others'], 
    default: 'Others' 
  },
  reviewed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
