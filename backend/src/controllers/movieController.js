const movieService = require('../services/movieService');

exports.rate = async (req, res, next) => {
  try {
    const updatedUser = await movieService.rate(req.user, req.body);
    res.status(201).json({ success: true, data: updatedUser });
  } catch (error) {
    error.statusCode=400
    next(error);
  }
};


exports.retriveMovie = async (req, res, next) => {
    try {
      const movieData = await movieService.retriveMovie(req.user, req.params.id);
      res.status(201).json({ success: true, data: movieData });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };

  exports.addMovieToWishList = async (req, res, next) => {
    try {
      const movieData = await movieService.addMovieToWishList(req.user,req.body, Number(req.params.id));
      res.status(201).json({ success: true, message: "Movie has been added successfully" });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };

  exports.addMovieToFavouriteList = async (req, res, next) => {
    try {
      const movieData = await movieService.addMovieToFavouriteList(req.user,req.body, Number(req.params.id));
      res.status(201).json({ success: true, message: "Movie has been added successfully" });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };

  exports.removeMovieFromFavouriteList = async (req, res, next) => {
    try {
      const movieData = await movieService.removeMovieFromFavouriteList(req.user, Number(req.params.id));
      res.status(201).json({ success: true, message: "Movie has been removed successfully" });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };

  exports.removeMovieFromWishList = async (req, res, next) => {
    try {
      const movieData = await movieService.removeMovieFromWishList(req.user, Number(req.params.id));
      res.status(201).json({ success: true, message: "Movie has been removed successfully" });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };

  exports.getFavouriteList = async (req, res, next) => {
    try {
      const FavouriteList = await movieService.getFavouriteList(req.user);
      res.status(200).json({ success: true, FavouriteList });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };

  exports.getWishList = async (req, res, next) => {
    try {
      const WishList = await movieService.getWishList(req.user);
      res.status(200).json({ success: true, WishList});
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };