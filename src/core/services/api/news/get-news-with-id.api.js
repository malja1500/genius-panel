import http from "../../interceptor";

export const getNewsWithIdAPI = async (id) => {
  try {
    const response = await http.get(`/News/${id}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
