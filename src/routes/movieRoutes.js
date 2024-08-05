const express = require('express');
const { rate, retriveMovie, getWishList, getFavouriteList, addMovieToFavouriteList, addMovieToWishList, removeMovieFromFavouriteList, removeMovieFromWishList } = require('../controllers/movieController');

const router = express.Router();

router.put('/rate', rate);
router.post('/:id/wishlist', addMovieToWishList);
router.post('/:id/favouritelist', addMovieToFavouriteList);
router.get('/wishlist', getWishList);
router.get('/favouritelist', getFavouriteList);
router.delete('/:id/wishlist', removeMovieFromWishList);
router.get('/:id', retriveMovie);
router.delete('/:id/favouritelist', removeMovieFromFavouriteList);

module.exports = router;