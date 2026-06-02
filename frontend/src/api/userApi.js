import API from "./axios";

export const searchUsers = (search) =>
  API.get(`/users?search=${search}`);