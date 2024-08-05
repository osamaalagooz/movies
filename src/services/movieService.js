const axios = require('axios');
const User = require('../models/userModel');
const CustomError = require('../errors/customeError');
const calculateAge = require("../utils/ageCalculator")

exports.rate = async (user, movieData) => {
   
            console.log('Rated Movies:', user.rated_movies);
            const movie = await user.rated_movies.find(movie => movie.referance_id === movieData.referance_id);

            if (movie) {
                console.log('Found movie:', movie);
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
    const userAge = calculateAge(user.date_of_birth)
    console.log('User Age:', userAge);

    let isAdult = false
    if (userAge >= 18) {
        isAdult = true
    }
    try {
        const response = await axios.get(`${process.env.BASE_URI}movie/${movieId}?api_key=${process.env.API_KEY}`);
        let movieData = response.data
        // console.log('Rated Movies:', user.rated_movies);
        const movie = await user.rated_movies.find(movie => movie.referance_id === Number(movieId));

        if (movie) {
            console.log('Found movie:', movie);
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

    exports.addMovieToWishList = async (user, movieData) => {
   
        console.log('Wished Movies:', user.wish_list);
        const movie = await user.wish_list.find(movie => movie.referance_id === movieData.id);

        if (movie) {
            throw new CustomError("Movie already added to your wish list", 400)
        } else {
            data = {
                referance_id: movieData.id,
                movie : movieData
            }
            user.wish_list.push(data)
        }
       return user.save();

}           

exports.addMovieToFavouriteList = async (user, movieData) => {
   
    console.log('favourite Movies:', user.favourite_list);
    const movie = await user.favourite_list.find(movie => movie.referance_id === movieData.id);

    if (movie) {
        throw new CustomError("Movie already added to your favourite list", 400)
    } else {
        data = {
            referance_id: movieData.id,
            movie : movieData
        }
        user.favourite_list.push(data)
    }
   return user.save();

}           

exports.removeMovieFromFavouriteList = async (user, movieID) => {
   
    console.log('favourite Movies:', user.favourite_list);
    user.wish_list = user.wish_list.filter(item => item.referance_id !== movieID);

    // Save the updated user document
    await user.save();

   return user;

}           


exports.removeMovieFromWishList = async (user, movieID) => {
   
    console.log('wish Movies:', user.wish_list);
    user.wish_list = await user.wish_list.filter(item => item.referance_id !== movieID);

    // Save the updated user document
    await user.save();

   return user;

}           

exports.getWishList = async (user) => {
   
    console.log('wish Movies:', user.wish_list);
    
   return user.wish_list;

}           

exports.getFavouriteList = async (user) => {
   
    console.log('wish Movies:', user.favourite_list);
    
   return user.favourite_list;

}           