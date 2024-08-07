import axiosServices from "../utils/axios";

const FAVLIST_PATH = "api/movies/";

export const getFavList = async () => {
  const res = await axiosServices.get(`${FAVLIST_PATH}favouritelist`);
  return res.data.FavouriteList;
};

export const addToFavlist = async ({ id, data2 }) => {
  const res = await axiosServices.post(
    `${FAVLIST_PATH}${id}/favouritelist`,
    data2
  );
  return res.data;
};

export const removeFromFavList = async (id) => {
  const res = await axiosServices.delete(`${FAVLIST_PATH}${id}/favouritelist`);
  return res.data;
};
