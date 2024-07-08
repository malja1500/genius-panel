import http from "../../../interceptor";

export const addReplyCommentAPI = async (comment) => {
  try {
    const response = await http.post("/Course/AddReplyCourseComment", comment);

    return response.data;
  } catch (error) {
    return false;
  }
};
