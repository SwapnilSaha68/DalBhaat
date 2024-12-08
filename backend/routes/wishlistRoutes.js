const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

router.post('/', async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Product name is required' });
      }
  
      const wishlistItem = await Wishlist.findOne({ name });
  
      if (wishlistItem) {
        wishlistItem.clickCount += 1;
        await wishlistItem.save();
      } else {
        await Wishlist.create({ name, clickCount: 1 });
      }
  
      res.status(200).json({ message: 'Wishlist updated successfully' });
    } catch (error) {
      console.error('Error updating wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const wishlist = await Wishlist.find();
      res.status(200).json(wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.delete('/:name', async (req, res) => {
    try {
      const { name } = req.params;
  
      if (!name) {
        return res.status(400).json({ error: 'Product name is required' });
      }
  
      await Wishlist.deleteOne({ name });
  
      res.status(200).json({ message: `Wishlist item '${name}' deleted successfully.` });
    } catch (error) {
      console.error('Error deleting wishlist item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
