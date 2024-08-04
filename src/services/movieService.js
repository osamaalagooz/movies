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
        const movie = await user.rated_movies.find(movie => movie.referance_id === movieId);

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

//     console.log('Rated Movies:', user.rated_movies);
//     const movie = await user.rated_movies.find(movie => movie.referance_id === movieData.referance_id);

//     if (movie) {
//         console.log('Found movie:', movie);
//         movie.rating = movieData.rating;
//         movie.is_rated = true


//     } else {
//         movieData["is_rated"] = true
//         movieData["rating"] = movieData.rating;
//         user.rated_movies.push(movieData)
//     }
//    return user.save();

}
