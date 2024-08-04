const express = require('express');
const { rate, retriveMovie, addMovieToFavouriteList, addMovieToWishList, removeMovieFromFavouriteList, removeMovieFromWishList } = require('../controllers/movieController');

const router = express.Router();

router.put('/rate', rate);
router.get('/:id', retriveMovie);
router.post('/:id/wishlist', addMovieToWishList);
router.post('/:id/favouritelist', addMovieToFavouriteList );
router.delete('/:id/wishlist', removeMovieFromWishList);
router.delete('/:id/favouritelist', removeMovieFromFavouriteList);

module.exports = router;