import axiosServices from "../utils/axios";

const WISHLIST_PATH = "api/movies/";

export const getWishList = async () => {
  const res = await axiosServices.get(`${WISHLIST_PATH}wishlist`);
  return res.data.WishList;
};

export const addToWishlist = async ({ id, data2 }) => {
  const res = await axiosServices.post(`${WISHLIST_PATH}${id}/wishlist`, data2);
  return res.data;
};

export const removeFromWishList = async (id) => {
  const res = await axiosServices.delete(`${WISHLIST_PATH}${id}/wishlist`);
  return res.data;
};
