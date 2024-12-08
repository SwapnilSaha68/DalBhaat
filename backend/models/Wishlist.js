const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  clickCount: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
