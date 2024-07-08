import http from "../../../interceptor";

export const acceptCourseCommentAPI = async (commentCourseId) => {
  try {
    const response = await http.post("/Course/AcceptCourseComment", undefined, {
      params: {
        commentCourseId,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
