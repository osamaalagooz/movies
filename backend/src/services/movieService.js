const axios = require('axios');
const {User, item} = require('../models/userModel');
const CustomError = require('../errors/customeError');
const calculateAge = require("../utils/ageCalculator")

exports.rate = async (user, movieData) => {
   
        const movie = await user.rated_movies.find(movie => movie.referance_id === movieData.referance_id);

        if (movie) {
            movie.rating = movieData.rating;
            movie.is_rated = true


        } else {
            movieData["is_rated"] = true
            movieData["rating"] = movieData.rating;
            user.rated_movies.push(movieData)
        }
        return user.save();

}

exports.retriveMovie = async (user, movieId) => {
    try {
        const response = await axios.get(`${process.env.BASE_URI}movie/${movieId}?api_key=${process.env.API_KEY}`);
        let movieData = response.data
        const movie = await user.rated_movies.find(movie => movie.referance_id === Number(movieId));

        if (movie) {
            movieData["rating"] = movie.rating;
            movieData["is_rated"] = movie.is_rated
        } else {
            movieData["is_rated"] = false
        }
        return movieData
      } catch (error) {
        throw error
      }
    }

    exports.addMovieToWishList = async (user, movieID) => {
   
        const movie = await user.wish_list.find(movie => movie.referance_id === movieID);
        if (movie) {
            throw new CustomError("Movie already added to your wish list", 400)
        } else {
            const response = await axios.get(`${process.env.BASE_URI}movie/${movieID}?api_key=${process.env.API_KEY}`);
            let movieData = response.data
            data = {
                referance_id: movieData.id,
                movie : movieData
            }
            user.wish_list.push(data)
        }
        user.save()
       return user;

}           

exports.addMovieToFavouriteList = async (user, movieID) => {
   
    const movie = await user.favourite_list.find(movie => movie.referance_id === movieID);

    if (movie) {
        throw new CustomError("Movie already added to your favourite list", 400)
    } else {
        const response = await axios.get(`${process.env.BASE_URI}movie/${movieID}?api_key=${process.env.API_KEY}`);
        let movieData = response.data
        data = {
            referance_id: movieData.id,
            movie : movieData
        }
        user.favourite_list.push(data)
    }
   return user.save();

}           

exports.removeMovieFromFavouriteList = async (user, movieID) => {
   
    user.favourite_list = user.favourite_list.filter(item => item.referance_id !== movieID);
    // Save the updated user document
    await user.save();

   return user;

}           


exports.removeMovieFromWishList = async (user, movieID) => {
   
    user.wish_list = await user.wish_list.filter(item => item.referance_id !== movieID);
    // Save the updated user document
    await user.save();

   return user;

}           

exports.getWishList = async (user) => {
    
   return user.wish_list;
}           

exports.getFavouriteList = async (user) => {
       
   return user.favourite_list;
}           