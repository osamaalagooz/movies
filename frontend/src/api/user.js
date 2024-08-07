import axiosServices from "../utils/axios";

const USER_PATH = "api/users/";

export const updateUserData = async (userData) => {
  const filteredData = {};

  for (const [key, value] of Object.entries(userData)) {
    if (value !== undefined && value !== null && value !== "") {
      filteredData[key] = value;
    }
  }

  if (Object.keys(filteredData).length === 0) {
    return null;
  }

  const res = await axiosServices.put(
    `${USER_PATH}update-profile`,
    filteredData
  );
  return res.data;
};

export const updateUserPassword = async (data) => {
  const res = await axiosServices.put(`${USER_PATH}change-password`, data);
  return res.data;
};
