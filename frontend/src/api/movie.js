import axiosServices from "../utils/axios";

const MOVIE_PATH = "api/movies/";

export const getMovie = async (id) => {
  const res = await axiosServices.get(`${MOVIE_PATH}${id}`);
  return res.data.data;
};

export const rateMovie = async (data) => {
  const res = await axiosServices.put(`${MOVIE_PATH}rate`, data);
  return res.data;
};
