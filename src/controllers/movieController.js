const movieService = require('../services/movieService');

exports.rate = async (req, res, next) => {
  try {
    console.log(req.user.rated_movies)
    const updatedUser = await movieService.rate(req.user, req.body);
    res.status(201).json({ success: true, data: updatedUser });
  } catch (error) {
    error.statusCode=400
    next(error);
  }
};


exports.retriveMovie = async (req, res, next) => {
    try {
      console.log(req.user.rated_movies)
      const movieData = await movieService.retriveMovie(req.user, req.params.id);
      res.status(201).json({ success: true, data: movieData });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };