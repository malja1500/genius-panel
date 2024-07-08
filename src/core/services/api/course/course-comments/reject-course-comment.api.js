import http from "../../../interceptor";

export const rejectCourseCommentAPI = async (commentCourseId) => {
  try {
    const response = await http.post("/Course/RejectCourseComment", undefined, {
      params: {
        commentCourseId,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
